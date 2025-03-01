import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import moment from "moment";
import deliveryPartnerModel from "../models/deliveryPartnerModel.js";

export const getAssignedPendingOrdersController = async (req, res) => {
  try {
    const { deliveryPartner_id } = req.params;

    // Find orders assigned to the delivery partner
    const orders = await orderModel
      .find({ partner: deliveryPartner_id, status: "Out For Delivery" })
      .populate("products.product", "name")
      .populate("buyer", "name address phone email")
      .populate("partner", "name")
      .sort({ updatedAt: 1, createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching assigned orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Example Controller Function
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      {
        deliverystatus: "Pending Approval",
      },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating order", error });
  }
};
// Example Controller Function
export const getDeliveryHistoryController = async (req, res) => {
  try {
    const { deliveryPartner_id } = req.params;

    const ordershistory = await orderModel
      .find({
        partner: deliveryPartner_id,
        status: "Delivered" || "Canceled",
        // deliverystatus: "Approved",
      })
      .populate("products.product", "name")
      .populate("buyer", "name address phone email")
      .populate("partner", "name")
      .sort({ updatedAt: 1 });

    return res.status(200).json({ success: true, ordershistory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getDeliveryActivity = async (req, res) => {
//   try {
//     const { partnerId } = req.params;

//     const orders = await orderModel.find({
//       partner: partnerId,
//       status: "Delivered",
//     });

//     let totalDeliveries = orders.length;
//     let onTimeDeliveries = 0;

//     const expectedDeliveryDays = 2;

//     orders.forEach((order) => {
//       const shippedAt = order.updatedAt; // Assuming `Shipped` happened before `Delivered`
//       const deliveredAt = moment(order.updatedAt); // When it was marked as Delivered

//       if (moment(deliveredAt).diff(shippedAt, "days") <= expectedDeliveryDays) {
//         onTimeDeliveries++;
//       }
//     });

//     const onTimePercentage =
//       totalDeliveries > 0
//         ? ((onTimeDeliveries / totalDeliveries) * 100).toFixed(2)
//         : 0;

//     return res.status(200).json({
//       totalDeliveries,
//       onTimePercentage,
//     });
//   } catch (error) {
//     console.error("Error fetching delivery activity", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getDeliveryActivity = async (req, res) => {
  try {
    const { partnerId } = req.params;

    const orders = await orderModel.find({
      partner: partnerId,
      status: "Delivered",
    });

    let dailyDeliveries = {};
    let expectedDeliveryDays = 2;

    orders.forEach((order) => {
      let deliveredDate = moment(order.updatedAt).format("DD-MM-YYYY");

      if (!dailyDeliveries[deliveredDate]) {
        dailyDeliveries[deliveredDate] = { total: 0, onTime: 0 };
      }

      dailyDeliveries[deliveredDate].total += 1;

      if (
        moment(order.updatedAt).diff(order.createdAt, "days") <=
        expectedDeliveryDays
      ) {
        dailyDeliveries[deliveredDate].onTime += 1;
      }
    });

    let categories = Object.keys(dailyDeliveries).sort();
    let totalDeliveries = categories.map((date) => dailyDeliveries[date].total);
    let onTimeDeliveries = categories.map(
      (date) => dailyDeliveries[date].onTime
    );

    return res.status(200).json({
      categories,
      totalDeliveries,
      onTimeDeliveries,
    });
  } catch (error) {
    console.error("Error fetching delivery activity", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getDeliveryStats = async (req, res) => {
//   try {
//     const { partnerId } = req.params;

//     const assignedDeliveries = await orderModel.countDocuments({
//       partner: partnerId,
//       $or: [{ status: "Shipped" }, { deliverystatus: "Pending Approval" }],
//     });

//     const pendingDeliveries = await orderModel.countDocuments({
//       partner: partnerId,
//       $or: [{ status: "Out For Delivery" }, { deliverystatus: "Pending Approval" }],
//     });

//     const pendingApprovals = await orderModel.countDocuments({
//       partner: partnerId,
//       deliverystatus: "Pending Approval",
//     });

//     const totalPackages = await orderModel.countDocuments({
//       partner: partnerId,
//     });

//     return res.status(200).json([
//       {
//         today: "Assigned Deliveries",
//         title: assignedDeliveries,
//         persent: "+30%",
//          icon: "🚚",
//         bnb: "bnb2",
//       },
//       {
//         today: "Pending Deliverie(s)",
//         title: pendingDeliveries,
//         persent: "Pending",
//         icon: "⏳",
//         bnb: "redtext",
//       },
//       {
//         today: "Pending Approval(s)",
//         title: pendingApprovals,
//         persent: "+10%",
//         icon: "✅",
//         bnb: "bnb2",
//       },
//       {
//         today: "Total Packages",
//         title: totalPackages,
//         persent: "+12%",
//         icon: "📦",
//         bnb: "bnb2",
//       },
//     ]);
//   } catch (error) {
//     console.error("Error fetching delivery stats", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getDeliveryStats = async (req, res) => {
  try {
    const { partnerId } = req.params;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const assignedDeliveries = await orderModel.countDocuments({
      partner: partnerId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      $or: [{ status: "Out For Delivery" }, { status: "Delivered" }],
    });

    const pendingDeliveries = await orderModel.countDocuments({
      partner: partnerId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      // $nor: [
      //   { status: "Out For Delivery" },
      //   { deliverystatus: "Pending Approval" },
      // ],
      $or: [{ deliverystatus: { $exists: false } }, { deliverystatus: null }],
    });

    const pendingApprovals = await orderModel.countDocuments({
      partner: partnerId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      deliverystatus: "Pending Approval",
    });

    const totalPackagesResult = await orderModel.aggregate([
      {
        $match: {
          partner: new mongoose.Types.ObjectId(partnerId),
          createdAt: { $gte: startOfToday, $lte: endOfToday },
          $or: [{ status: "Shipped" }, { status: "Out For Delivery" }, { status: "Delivered" }],
        },
      },
      {
        $project: {
          productCount: { $size: "$products" },
        },
      },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: "$productCount" },
        },
      },
    ]);

    const totalPackages =
      totalPackagesResult.length > 0 ? totalPackagesResult[0].totalProducts : 0;

    return res.status(200).json([
      {
        today: "Assigned Deliveries",
        title: assignedDeliveries,
        persent: "+30%",
        icon: "🚚",
        bnb: "bnb2",
      },
      {
        today: "Pending Deliverie(s)",
        title: pendingDeliveries,
        persent: "Pending",
        icon: "⏳",
        bnb: "redtext",
      },
      {
        today: "Pending Approval(s)",
        title: pendingApprovals,
        persent: "+10%",
        icon: "✅",
        bnb: "bnb2",
      },
      {
        today: "Total Packages",
        title: totalPackages,
        persent: "+12%",
        icon: "📦",
        bnb: "bnb2",
      },
    ]);
  } catch (error) {
    console.error("Error fetching delivery stats", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const updatePartnerStatus = async (req, res) => {
  try {
    const { deliveryId } = req.params;

    const delivery = await deliveryPartnerModel.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }

    delivery.status = delivery.status === "Online" ? "Offline" : "Online";

    await delivery.save();

    return res.status(200).json({
      message: "Status updated successfully",
      status: delivery.status,
    });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



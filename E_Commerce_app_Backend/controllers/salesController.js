import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// export const getAdminSalesData = async (req, res) => {
//   try {
//     const salesData = await orderModel.find({
//       deliverystatus: "Approved",
//       status: "Delivered",
//     }).select("products createdAt");

//     const monthlySales = {};

//     salesData.forEach((order) => {
//       const month = new Date(order.createdAt).toLocaleString("default", {
//         month: "short",
//       });

//       order.products.forEach((item) => {
//         if (!monthlySales[month]) {
//           monthlySales[month] = 0;
//         }
//         monthlySales[month] += item.orgprice * item.quantity;
//       });
//     });

//     res.json({
//       success: true,
//       sales: Object.entries(monthlySales).map(([month, total]) => ({
//         month,
//         total,
//       })),
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import userModel from "../models/userModel.js";

export const getAdminDashboardData = async (req, res) => {
  try {
    const deliveredOrders = await orderModel
      .find({
        deliverystatus: "Approved",
        status: "Delivered",
      })
      .select("products createdAt user");

    // Total Sales Calculation (in ₹)
    let totalSales = 0;
    let totalProductsSold = 0;
    const monthlySales = {};

    deliveredOrders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      order.products.forEach((product) => {
        totalSales += product.orgprice * product.quantity;
        totalProductsSold += product.quantity;

        if (!monthlySales[month]) {
          monthlySales[month] = 0;
        }
        monthlySales[month] += product.orgprice * product.quantity;
      });
    });

    // Active Users (Users who placed an order in the last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const activeUsers = await orderModel.distinct("buyer", {
      createdAt: { $gte: last30Days },
    });

    // Prepare data for frontend
    const dashboardData = {
      totalSales,
      totalProductsSold,
      activeUsers: activeUsers.length,
      categories: Object.keys(monthlySales),
      sales: Object.values(monthlySales),
    };

    res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesDataController = async (req, res) => {
  try {
    const totalSales = await orderModel.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toDouble: "$payment.transaction.amount" } },
        },
      },
    ]);

    const pendingOrders = await orderModel.countDocuments({
      status: { $ne: "Delivered" },
    });

    const totalProducts = await productModel.countDocuments();

    const pendingApprovals = await orderModel.countDocuments({
      deliverystatus: "Pending Approval",
    });

    const formatAmount = (amount) => {
      if (amount >= 1_00_00_000)
        return (amount / 1_00_00_000).toFixed(1) + "Cr";
      if (amount >= 1_00_000) return (amount / 1_00_000).toFixed(1) + "L";
      if (amount >= 1_000) return (amount / 1_000).toFixed(1) + "K";
      return amount.toString();
    };
    const totalAmount = totalSales.length > 0 ? totalSales[0].totalAmount : 0;
    const data = [
      {
        today: "Today’s Sales",
        title: formatAmount(totalAmount),
        fullValue: `₹${totalAmount.toLocaleString("en-IN")}`,
        persent: "+30%",
        icon: "💰",
        bnb: "bnb2",
      },
      {
        today: "Pending Orders",
        title: pendingOrders.toString(),
        persent: "Pending",
        icon: "🛒",
        bnb: "redtext",
      },
      {
        today: "Total Products",
        title: totalProducts.toString(),
        persent: "+12%", 
        icon: "📦",
        bnb: "bnb2",
      },
      {
        today: "Pending Approvals",
        title: pendingApprovals.toString(),
        persent: "Pending",
        icon: "⏳",
        bnb: "redtext",
      },
    ];

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching sales data", error });
  }
};

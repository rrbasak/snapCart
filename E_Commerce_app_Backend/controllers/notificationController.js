import NotificationModel from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
//users
export const createOrderPlacedNotificationController = async (req, res) => {
  try {
    const { title, message, recipient, recipientId, type } = req.body;

    if (!title || !message || !recipient || !recipientId || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notification = new NotificationModel({
      title,
      message,
      recipient,
      recipientId,
      type,
    });

    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// export const getOrderPlacedNotificationController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const notifications = await NotificationModel.find({ recipientId: userId })
//       .sort({ createdAt: -1 });

//     const unreadCount = await NotificationModel.countDocuments({
//       recipientId: userId,
//       status: "unread",
//     });

//     res.status(200).json({ notifications, unreadCount });
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getOrderPlacedNotificationController = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const totalNotifications = await NotificationModel.countDocuments({
      recipientId: userId,
    });

    const notifications = await NotificationModel.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const unreadCount = await NotificationModel.countDocuments({
      recipientId: userId,
      status: "unread",
    });

    const hasMore = totalNotifications > page * limit;

    res.status(200).json({ notifications, unreadCount, hasMore });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserNotificationsController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    await NotificationModel.updateMany(
      { recipientId: userId, status: "unread" },
      { status: "read" }
    );
    const notifications = await NotificationModel.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .limit(4);
    const unreadCount = await NotificationModel.countDocuments({
      recipientId: userId,
      status: "unread",
    });
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const creatingOrderPlacedOrderNotificationController = async (
  req,
  res
) => {
  try {
    const { title, message, status, recipient, type } = req.body;

    const adminUser = await userModel.findOne({ role: 1 });

    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "No admin found" });
    }

    const notification = new NotificationModel({
      title,
      message,
      status,
      recipient,
      type,
      recipientId: adminUser._id,
    });

    await notification.save();

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Error creating order placed notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//admin
export const primeDayStartNotificationController = async (req, res) => {
  try {
    const { title, message, status, recipient, type } = req.body;
    const users = await userModel.find({ role: 0 }, "_id");

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    const notificationData = {
      title,
      message,
      status,
      recipient,
      type,
    };

    const notifications = users.map((user) => ({
      ...notificationData,
      recipientId: user._id,
    }));

    await NotificationModel.insertMany(notifications);

    return res.status(200).json({
      success: true,
      message: "Prime Day notifications sent to all users",
    });
  } catch (error) {
    console.error("Error sending Prime Day notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending Prime Day notifications",
      error: error.message,
    });
  }
};
export const getAdminNotificationController = async (req, res) => {
  try {
    const { adminId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    
    const totalNotifications = await NotificationModel.countDocuments({
      recipientId: adminId,
    });
    const notifications = await NotificationModel.find({ recipientId: adminId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const unreadCount = await NotificationModel.countDocuments({
      recipientId: adminId,
      status: "unread",
    });
    const hasMore = totalNotifications > page * limit;
    res.status(200).json({ notifications, unreadCount, hasMore });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateAdminNotificationsController = async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!adminId || adminId.length !== 24) {
      return res.status(400).json({ error: "Invalid adminId" });
    }

    await NotificationModel.updateMany(
      { recipientId: adminId, status: "unread" },
      { status: "read" }
    );
    const notifications = await NotificationModel.find({ recipientId: adminId })
      .sort({ createdAt: -1 })
      .limit(4);
    const unreadCount = await NotificationModel.countDocuments({
      recipientId: adminId,
      status: "unread",
    });
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const lowStockNotificationsController = async (req, res) => {
  try {
    const { title, message, status, recipient, type } = req.body;
    const adminUsers = await userModel.find({ role: 1 }, "_id");

    if (!adminUsers.length) {
      return res.status(404).json({
        success: false,
        message: "No admin users found to receive the notification.",
      });
    }

    const notificationData = {
      title,
      message,
      status,
      recipient,
      type,
    };

    const notifications = adminUsers.map((admin) => ({
      ...notificationData,
      recipientId: admin._id,
    }));

    await NotificationModel.insertMany(notifications);

    return res.status(200).json({
      success: true,
      message: "Low stock notifications have been sent to all admins.",
    });
  } catch (error) {
    console.error("Error sending low stock notifications:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending low stock notifications.",
      error: error.message,
    });
  }
};
export const outOfStockNotificationsController = async (req, res) => {
  try {
    const { title, message, status, recipient, type } = req.body;
    const adminUsers = await userModel.find({ role: 1 }, "_id");

    if (!adminUsers.length) {
      return res.status(404).json({
        success: false,
        message:
          "No admin users found to receive the out-of-stock notification.",
      });
    }

    const notificationData = {
      title,
      message,
      status,
      recipient,
      type,
    };

    const notifications = adminUsers.map((admin) => ({
      ...notificationData,
      recipientId: admin._id,
    }));

    await NotificationModel.insertMany(notifications);

    return res.status(200).json({
      success: true,
      message: "Out-of-stock notifications have been sent to all admins.",
    });
  } catch (error) {
    console.error("Error sending out-of-stock notifications:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending out-of-stock notifications.",
      error: error.message,
    });
  }
};
export const deliveryPartnerNotificationController = async (req, res) => {
  try {
    const { title, message, status, recipient, type } = req.body;

    const adminUser = await userModel.findOne({ role: 1 });

    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "No admin found" });
    }

    const notification = new NotificationModel({
      title,
      message,
      status,
      recipient,
      type,
      recipientId: adminUser._id,
    });

    await notification.save();

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Error creating delivery partner notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delivery partner
export const getDeliverpartnerNotificationController = async (req, res) => {
  try {
    const { deliverPartnerId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const totalNotifications = await NotificationModel.countDocuments({
      recipientId: deliverPartnerId,
    });
    const notifications = await NotificationModel.find({
      recipientId: deliverPartnerId,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const unreadCount = await NotificationModel.countDocuments({
      recipientId: deliverPartnerId,
      status: "unread",
    });
    const hasMore = totalNotifications > page * limit;
    res.status(200).json({ notifications, unreadCount, hasMore });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateDeliverpartnerNotificationsController = async (req, res) => {
  try {
    const { deliverPartnerId } = req.params;

    if (!deliverPartnerId || deliverPartnerId.length !== 24) {
      return res.status(400).json({ error: "Invalid deliverPartnerId" });
    }

    await NotificationModel.updateMany(
      { recipientId: deliverPartnerId, status: "unread" },
      { status: "read" }
    );
    const notifications = await NotificationModel.find({
      recipientId: deliverPartnerId,
    })
      .sort({ createdAt: -1 })
      .limit(4);
    const unreadCount = await NotificationModel.countDocuments({
      recipientId: deliverPartnerId,
      status: "unread",
    });
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



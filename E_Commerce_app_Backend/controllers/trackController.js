import ChartData from "../models/chartDataModel.js";
export const trackActivityController = async (req, res) => {
  try {
    //console.log("Data here baby", req.body);
    const { source } = req.body;
    const currentMonth = new Date().toLocaleString("default", {
      month: "short",
    });

    let data = await ChartData.findOne();
    //console.log("data", data);
    if (!data) {
      data = new ChartData({
        category: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        mobileApps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        websites: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
    }

    const monthIndex = data.category.indexOf(currentMonth);
    if (monthIndex !== -1) {
      if (source === "mobile") {
        data.mobileApps[monthIndex] += 1;
      } else if (source === "website") {
        data.websites[monthIndex] += 1;
      }
    }

    await data.save();
    res.json({ message: "User activity tracked successfully!" });
  } catch (error) {
    //console.log("error", error);
    res.status(500).json({ message: "Error tracking user activity", error });
  }
};

export const getTrackActivityController = async (req, res) => {
  try {
    const data = await ChartData.findOne();
    res.json({
      series: [
        { name: "Mobile apps", data: data.mobileApps },
        { name: "Websites", data: data.websites },
      ],
      categories: data.category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chart data" });
  }
};

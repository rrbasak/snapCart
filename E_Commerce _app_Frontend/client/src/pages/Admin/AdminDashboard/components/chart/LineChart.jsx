// import ReactApexChart from "react-apexcharts";
// import { Typography } from "antd";
// import { MinusOutlined } from "@ant-design/icons";
// import lineChart from "./configs/lineChart";

// function LineChart() {
//   const { Title, Paragraph } = Typography;

//   return (
//     <>
//       <div className="linechart">
//         <div>
//           <Title level={5}>Active Users</Title>
//           <Paragraph className="lastweek">
//             than last week <span className="bnb2">+30%</span>
//           </Paragraph>
//         </div>
//         <div className="sales">
//           <ul>
//             <li>{<MinusOutlined />} Traffic</li>
//             <li>{<MinusOutlined />} Sales</li>
//           </ul>
//         </div>
//       </div>

//       <ReactApexChart
//         className="full-width"
//         options={lineChart.options}
//         series={lineChart.series}
//         type="area"
//         height={350}
//         width={"100%"}
//       />
//     </>
//   );
// }

// export default LineChart;



import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import axios from "axios";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: "area", height: 350, toolbar: { show: false } },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      yaxis: {
        labels: {
          style: { fontSize: "14px", fontWeight: 600, colors: ["#8c8c8c"] },
        },
      },
      xaxis: {
        labels: {
          style: { fontSize: "14px", fontWeight: 600, colors: ["#8c8c8c"] },
        },
        categories: [],
      },
      tooltip: { y: { formatter: (val) => val } },
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/v1/track/get-activity");
        setChartData((prev) => ({
          ...prev,
          series: response.data.series,
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories: response.data.categories,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Mobile</li>
            <li>{<MinusOutlined />} Website</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </>
  );
}

export default LineChart;

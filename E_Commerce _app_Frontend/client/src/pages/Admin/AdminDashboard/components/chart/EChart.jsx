// import ReactApexChart from "react-apexcharts";
// import { Row, Col, Typography } from "antd";
// import eChart from "./configs/eChart";

// function EChart() {
//   const { Title, Paragraph } = Typography;

//   const items = [
//     {
//       Title: "3,6K",
//       user: "Users",
//     },
//     {
//       Title: "2m",
//       user: "Clicks",
//     },
//     {
//       Title: "$772",
//       user: "Sales",
//     },
//     {
//       Title: "82",
//       user: "Items",
//     },
//   ];

//   return (
//     <>
//       <div id="chart">
//         <ReactApexChart
//           className="bar-chart"
//           options={eChart.options}
//           series={eChart.series}
//           type="bar"
//           height={220}
//         />
//       </div>
//       <div className="chart-vistior">
//         <Title level={5}>Active Users</Title>
//         <Paragraph className="lastweek">
//           than last week <span className="bnb2">+30%</span>
//         </Paragraph>
//         <Paragraph className="lastweek">
//           We have created multiple options for you to put together and customise
//           into pixel perfect pages.
//         </Paragraph>
//         <Row gutter>
//           {items.map((v, index) => (
//             <Col xs={6} xl={6} sm={6} md={6} key={index}>
//               <div className="chart-visitor-count">
//                 <Title level={4}>{v.Title}</Title>
//                 <span>{v.user}</span>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </>
//   );
// }

// export default EChart;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import ReactApexChart from "react-apexcharts";
// import { Row, Col, Typography } from "antd";

// function EChart() {
//   const items = [
//     {
//       Title: "3,6K",
//       user: "Users",
//     },
//     {
//       Title: "2m",
//       user: "Clicks",
//     },
//     {
//       Title: "$772",
//       user: "Sales",
//     },
//     {
//       Title: "82",
//       user: "Items",
//     },
//   ];
//   const { Title, Paragraph } = Typography;
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         const { data } = await axios.get("/api/v1/sales/sales-data");
//         if (data.success) {
//           setSalesData(data.sales);
//         }
//       } catch (error) {
//         console.error("Error fetching sales data", error);
//       }
//     };

//     fetchSalesData();
//   }, []);

//   const chartData = {
//     series: [
//       {
//         name: "Sales",
//         data: salesData.map((item) => item.total),
//         color: "#fff",
//       },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         width: "100%",
//         height: "auto",
//         toolbar: { show: false },
//       },
//       xaxis: {
//         categories: salesData.map((item) => item.month),
//         labels: { style: { colors: "#fff" } },
//       },
//       yaxis: { labels: { style: { colors: "#fff" } } },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return "₹ " + val.toLocaleString("en-IN");
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <div id="chart">
//         <ReactApexChart
//           className="bar-chart"
//           options={chartData.options}
//           series={chartData.series}
//           type="bar"
//           height={220}
//         />
//       </div>
//       {/* <div className="chart-vistior">
//         <Title level={5}>Total Sales</Title>
//         <Paragraph className="lastweek">Updated Sales Data</Paragraph>
//         <Row gutter>
//           {salesData.map((v, index) => (
//             <Col xs={6} xl={6} sm={6} md={6} key={index}>
//               <div className="chart-visitor-count">
//                 <Title level={4}>$ {v.total}</Title>
//                 <span>{v.month}</span>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </div> */}
//       <div className="chart-vistior">
//         <Title level={5}>Active Users</Title>
//         <Paragraph className="lastweek">
//           than last week <span className="bnb2">+30%</span>
//         </Paragraph>
//         <Paragraph className="lastweek">
//           We have created multiple options for you to put together and customise
//           into pixel perfect pages.
//         </Paragraph>
//         <Row gutter>
//           {items.map((v, index) => (
//             <Col xs={6} xl={6} sm={6} md={6} key={index}>
//               <div className="chart-visitor-count">
//                 <Title level={4}>{v.Title}</Title>
//                 <span>{v.user}</span>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </>
//   );
// }

// export default EChart;



import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { Row, Col, Typography } from "antd";
import { Tooltip } from "antd";


function EChart() {
  const { Title, Paragraph } = Typography;
  const [chartData, setChartData] = useState({
    categories: [],
    sales: [],
    totalSales: 0,
    totalProductsSold: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get("/api/v1/sales/dashboard-data");
        if (data.success) {
          setChartData(data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchDashboardData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 1, colors: ["transparent"] },
    grid: { show: true, borderColor: "#ccc", strokeDashArray: 2 },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: { colors: Array(chartData.categories.length).fill("#fff") },
      },
    },
    yaxis: { labels: { style: { colors: Array(10).fill("#fff") } } },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val.toLocaleString("en-IN");
        },
      },
    },
  };
const formatToShort = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L"; 
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"; 
  }
  return num.toString(); 
};

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={chartOptions}
          series={[{ name: "Sales", data: chartData.sales, color: "#fff" }]}
          type="bar"
          height={220}
        />
      </div>

      <div className="chart-visitor">
        <Title level={5}>Dashboard Summary</Title>
        <Paragraph className="lastweek">
          Total active users who made a purchase in the last 30 days.
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={8} sm={8} md={8} xl={8}>
            <div className="chart-visitor-count">
              <Tooltip
                title={`₹ ${chartData.totalSales.toLocaleString()}`}
                placement="bottom"
              >
                <Title level={4}>₹ {formatToShort(chartData.totalSales)}</Title>
              </Tooltip>
              <span>Revenue</span>
            </div>
          </Col>

          <Col xs={8} sm={8} md={8} xl={8}>
            <div className="chart-visitor-count">
              <Title level={4}>{chartData.totalProductsSold}</Title>
              <span>Sold</span>
            </div>
          </Col>

          <Col xs={8} sm={8} md={8} xl={8}>
            <div className="chart-visitor-count">
              <Title level={4}>{chartData.activeUsers}</Title>
              <span>Users</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EChart;

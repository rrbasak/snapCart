import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../../../../../src/context/auth";

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
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/api/v1/delivery/get-delivery-activity/${auth?.user?._id}`
        );

        setChartData((prev) => ({
          ...prev,
          series: [
            {
              name: "Total Deliveries",
              data: response.data.totalDeliveries || [],
            },
            {
              name: "On-Time Deliveries",
              data: response.data.onTimeDeliveries || [],
            },
          ],
          options: {
            ...prev.options,
            xaxis: {
              categories: response.data.categories || [],
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching delivery activity data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Delivery Activity</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Total Deliveries</li>
            <li>{<MinusOutlined />} On-Time Deliveries</li>
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

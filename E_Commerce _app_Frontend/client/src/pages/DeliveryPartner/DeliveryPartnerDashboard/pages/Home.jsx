import { useEffect, useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import card from "../assets/images/info-card-1.jpg";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import DangerSwitch from "../../../../components/commonComponents/DangerSwitch";
import { useAuth } from "../../../../context/auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePartnerStatus } from "../../../../features/status/statusSlice";
import DeliveryPartnerDashboardSkeleton from "../../../../skeleton/DeliveryPartner/DeliveryPartnerDashboardSkeleton";

function Home() {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [loading, setLoading] = useState(false);
  const [reverse, setReverse] = useState(false);
  const toggleStatus = () => {
    dispatch(updatePartnerStatus(auth.user._id));
  };
  const isOnline = useSelector((state) => state.status.isOnline);
  const deliveryTruck = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 3H17V16H3V3Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8H21L23 11V16H17V8Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="18.5" r="2.5" fill="#fff" />
      <circle cx="18.5" cy="18.5" r="2.5" fill="#fff" />
    </svg>,
  ];
  const clock = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={1}
    >
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
      <path
        d="M12 6V12L16 14"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];
  const packageIcon = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={2}
    >
      <path
        d="M4 4H20V20H4V4Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 9H20"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 4V9"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];
  const approvalIcon = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={3}
    >
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
      <path
        d="M9 12L11 14L15 10"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];
  const checkIcon = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={4}
    >
      <path
        d="M9 16.172L4.828 12l-1.414 1.414L9 18l11-11-1.414-1.414L9 16.172z"
        fill="#fff" // Green color for success
      />
    </svg>,
  ];
  const count = [
    {
      today: "Assigned Deliveries",
      title: "10",
      persent: "+30%",
      icon: deliveryTruck,
      bnb: "bnb2",
    },
    {
      today: "Pending Deliverie(s)",
      title: "2",
      persent: "Pending",
      icon: clock,
      bnb: "redtext",
    },
    {
      today: "Pending Approval(s)",
      title: "8",
      // description:
      persent: "+10%",
      icon: checkIcon,
      bnb: "bnb2",
    },
    {
      today: "Total Packages",
      title: "14",
      persent: "+12%",
      icon: packageIcon,
      bnb: "bnb2",
    },
    // {
    //   today: "Pending Approvals",
    //   title: "8",
    //   persent: "Pending",
    //   icon: approvalIcon, // Replace with a checkmark or approval icon
    //   bnb: "redtext",
    // },
  ];
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [auth] = useAuth();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/delivery/get-delivery-stats/${auth?.user?._id}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching delivery stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [auth?.user?._id]);
  const iconMap = {
    TruckOutlined: (
      <TruckOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
    ),
    ClockCircleOutlined: (
      <ClockCircleOutlined style={{ fontSize: "24px", color: "#faad14" }} />
    ),
    CheckCircleOutlined: (
      <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
    ),
    InboxOutlined: (
      <InboxOutlined style={{ fontSize: "24px", color: "#722ed1" }} />
    ),
  };
  return (
    <>
      <div className="layout-content">
        {loading ? (
          <DeliveryPartnerDashboardSkeleton />
        ) : (
          <>
            <Row className="rowgap-vbox" gutter={[24, 0]}>
              {isMobileView && (
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                  <Card bordered={false} className="criclebox">
                    <div className="number">
                      <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                          <span>Active</span>
                        </Col>
                        <Col xs={6} className="icon-col">
                          <DangerSwitch
                            isOnline={isOnline}
                            toggleStatus={toggleStatus}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              )}

              {stats.map((c, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  className="mb-24"
                >
                  <Card bordered={false} className="criclebox">
                    <div className="number">
                      <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                          <span>{c.today}</span>
                          <Title level={3}>
                            <Tooltip title={c.fullValue || c.title}>
                              <span>{c.title}</span>
                            </Tooltip>
                            <small className={c.bnb}>{c.percent}</small>
                          </Title>
                        </Col>
                        <Col xs={6}>
                          <div className="icon-box">{c.icon}</div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[24, 0]}>
              {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col> */}
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                  <LineChart />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Home;

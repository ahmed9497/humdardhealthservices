import { Button, Card, Col, Row, Table, Tag, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { dashboardOnCall } from "../../services/helper.service";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [stats, setStats] = useState({});
 
  const [onCallList, setOnCallList] = useState([]);

  const navigate = useNavigate();
  const columns = [
    {
      title: "S.No",
      // dataIndex: 'username',
      key: "id",
      render: (text, record, index) => <div>{index + 1}</div>,
      // sorter: (a, b) => a.username.length - b.username.length,
      // sortDirections: ['descend', 'ascend'],
    },

    {
      title: "Client Name",
      dataIndex: "name",
      key: "id",
      render: (text) => <div>{text?.toUpperCase()}</div>,
      // ...getColumnSearchProps('name'),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ['descend', 'ascend'],
    },
  
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "id",
      render: (text) => <div>{text.toUpperCase()}</div>,
      // ...getColumnSearchProps('serviceType'),
      // sorter: (a, b) => a.serviceType.length - b.serviceType.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Mode Of Service",
      key: "id",
      dataIndex: "modeOfService",
      render: (text) => <div>{text}</div>,
      // ...getColumnSearchProps('serviceType'),
      // sorter: (a, b) => a.serviceType.length - b.serviceType.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Status",
      key: "id",
      dataIndex: "jobStatus",
      render: (status) => (
        <Tag color={status === "open" ? "green" : "red"}>
          {status === "open" ? "Open" : "Closed"}
        </Tag>
      ),
    },

   
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() =>
            navigate(
              `/dashboard/client/assign/staff/${encodeURIComponent(
                btoa(JSON.stringify(record))
              )}`
            )
          }
        >
          Details
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getOnCall();
  }, []);

  const getOnCall = async () => {
    try {
      const res = await dashboardOnCall();

      if (res.code === "200") {
        let temp = res.responseData?.data.map((i, ind) => ({
          id: ind + 1,
          ...i,
        }));

        setStats(res.responseData.stats[0]);
        setOnCallList(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Row justify="space-between">
        <Col>
          <Title level={2}>Dashboard</Title>
        </Col>
      </Row>
      <Row gutter={[16, 12]} className="mb-5">
        <Col span={6}>
          <Card style={{height:130}}>
            <Row>
              <Col span={19}>
                <h3>
                  <b>Users</b>
                </h3>
              </Col>
              <Col span={5}>
                <FiUsers color={"blue"} size={30} />
              </Col>
            </Row>
                <Row justify="space-between">
                  <Col span={12}>
                    <Title  strong type="success" level={5}>
                      Staff
                    </Title>
                    <Text strong type="secondary">
                      {stats?.staffCount}
                    </Text>
                  </Col>
                  <Col span={12}>
                  <Title  strong type="success" level={5}>
                      Clients
                    </Title>
                    <Text strong type="secondary">
                    {stats?.clientCount}
                    </Text>
                  </Col>
                </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{height:130}}>
            <Row>
              <Col span={19}>
                <h3>
                  <b>Total</b>
                </h3>
                <Text strong type="secondary">
                  {stats?.totalEarning}
                </Text>
              </Col>
              <Col span={5}>
                <GiReceiveMoney color={"green"} size={35} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{height:130}}>
            <Row>
              <Col span={19}>
                <h3>
                  <b>Profit</b>
                </h3>
                <Text strong type="secondary">
                {stats?.salaries}
                </Text>
              </Col>
              <Col span={5}>
                <AiFillDollarCircle color={"green"} size={35} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{height:130}}>
            <Row>
              <Col span={19}>
                <h3>
                  <b>Staff Salaries</b>
                </h3>
                <Text strong type="secondary">
                   {stats?.totalEarning - stats?.salaries}
                </Text>
              </Col>
              <Col span={5}>
                <GiPayMoney color={"red"} size={35} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
      <Row justify="space-between">
        <Col>
          <Title level={2}>On Call</Title>
        </Col>
      </Row>
    
        <Table columns={columns} dataSource={onCallList} rowKey={"id"} />
        
    </Fragment>
  );
};

export default Dashboard;

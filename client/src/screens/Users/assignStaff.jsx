import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Tabs,
  Switch,
  Checkbox,
  Button,
  Typography,
  Row,
  Col,
  Select,
  message,
  Card,
  Divider,
  Table,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addPayment,
  addUser,
  assignPayments,
  fetchPayments,
  fetchRoles,
  fetchStaff,
  updateStatus,
  updateUser,
} from "../../services/helper.service";
import { useParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu, Space } from "antd";
import CardInterface from "../../components/CardInterface";
const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="+92">+92</Option>
    </Select>
  </Form.Item>
);

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Action 1",
      },
      {
        key: "2",
        label: "Action 2",
      },
    ]}
  />
);
const AssignStaff = () => {
  const params = useParams();
  const [payments, setPayments] = useState([]);
  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  let data = atob(params.id);
  data = JSON.parse(data);
  console.log(data);
  const [paymentModal, setModalPayment] = useState(false);
  const [staffModal, setModalStaff] = useState(false);
  const [staff, setStaff] = useState([]);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    getPayments();
    getUsers();
  }, []);
  const getPayments = async () => {
    let req = {
      clientId: data.clientId || data._id,
    };
    try {
      const res = await fetchPayments(req);

      if (res.code === "200") {
        setPayments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      let req = {};
      const res = await fetchStaff(req);

      if (res.code === "200") {
        setStaff(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishAssign = async (values) => {
    try {
      let req = {
        ...values,
        paymentId,
        // clientId:data._id
      };

      let p = payments.find((i) => i._id === paymentId);

      let stafpay = p.staffPayments;

      let rem = stafpay.reduce((prev, cur) => {
        return parseInt(prev) + parseInt(cur.salary);
      }, 0);

      req.remainingBalance = +p.amount - req.salary - rem || 0;

      let res = await assignPayments(req);

      if (res.code === "200") {
        message.success("Staff Assigned Successfully");
        assignForm.resetFields();
        handleOkStaff();
        getPayments();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.error);
    }
  };

  const onFinishPayment = async (values) => {
    try {
      let req = {
        ...values,
        clientId:  data.clientId ||data._id,
      };
      const res = await addPayment(req);
      if (res.code === "200") {
        message.success("Payment added Successfully");
        form.resetFields();
        handleOkPayment();
        getPayments();
      }
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {};

  const showPaymentModal = () => {
    setModalPayment(true);
  };
  const showStaffModal = (val) => {
    setPaymentId(val._id);
    setModalStaff(true);
  };

  const handleOkPayment = () => {
    setModalPayment(false);
  };
  const handleOkStaff = () => {
    setModalStaff(false);
  };

  const handleCancelPayment = () => {
    setModalPayment(false);
  };
  const handleCancelStaff = () => {
    setModalStaff(false);
  };

  const expandedRowRender = (rowData) => {
    const columns = [
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amouunt",
      },
      {
        title: "Start Date",
        // dataIndex: 'date',
        // key: 'date',
        render: (text) => <>{moment(text?.date[0]).format("MMM DD,YYYY")}</>,
      },
      {
        title: "End Date",
        // dataIndex: 'date',
        // key: 'date',
        render: (text) => <>{moment(text?.date[1]).format("MMM DD,YYYY")}</>,
      },
    ];
    const staffColumns = [
      {
        title: "Name",
        dataIndex: "assignStaff",
        key: "assignStaff.name",
        render: (text) => <>{text?.name}</>,
      },
      {
        title: "Salary",
        dataIndex: "salary",
        key: "salary",
        render: (text) => <>{text}</>,
      },
      {
        title: "Remaining Balance",
        dataIndex: "remainingBalance",
        key: "remainingBalance",
        render: (text) => <>{text}</>,
      },
      {
        title: "Start Date",
        // dataIndex: 'date',
        // key: 'date',
        render: (text) => <>{moment(text?.date[0]).format("MMM DD,YYYY")}</>,
      },
      {
        title: "End Date",
        // dataIndex: 'date',
        // key: 'date',
        render: (text) => <>{moment(text?.date[1]).format("MMM DD,YYYY")}</>,
      },
    ];
    let data = [];
    if (rowData?.paymentInstallments) {
      data = rowData?.paymentInstallments;
    }
    let staffData = [];
    if (rowData?.staffPayments) {
      staffData = rowData?.staffPayments;
    }
    return (
      <>
        {data && data?.length ? (
          <>
            <Text type="success" style={{ fontSize: 22, paddingLeft: 50 }} mark>
              Installments
            </Text>
            <Table
              columns={columns}
              className="nestedTable"
              dataSource={data}
              pagination={false}
            />
          </>
        ) : null}
        {staffData && staffData?.length > 0 ? (
          <>
            <Text type="success" style={{ fontSize: 22, paddingLeft: 50 }} mark>
              Staff
            </Text>
            <Table
              columns={staffColumns}
              className="nestedTable"
              dataSource={staffData}
              pagination={false}
            />
          </>
        ) : null}
      </>
    );
  };

  const columns = [
    {
      title: "Sr No.",
      // dataIndex: '_id',
      // key: '_id',
      render: (text, record, index) => <>{index + 1}</>,
    },
    {
      title: "Contractual Amount",
      dataIndex: "amount",
      key: "_id",
    },
    {
      title: "Total Paid to Staff",
      dataIndex: "paidToStaff",
      key: "_id",
    },
    {
      title: "Balance",
      render: (text) => <>{text.amount - text.paidToStaff}</>,
      key: "_id",
    },

    {
      title: "Installments",
      render: (text) => <>{text.installments ? "Yes" : "No"}</>,
      key: "_id",
    },
    {
      title: "Action",
      render: (text) => (
        <Button type="link" onClick={() => showStaffModal(text)}>
          Assign Staff
        </Button>
      ),
      key: "_id",
    },
  ];

  const statusUpdate = async (e) => {
    let req = {
      status: e ? "open" : "close",
      id: data.clientId ||data._id,
    };
    const res = await updateStatus(req);
    if (res.code === "200") {
      message.success("Status Update Successfully");
        
      getPayments();
    }
  };

  return (
    <Fragment>
      {/* Payment Modal */}

      <Modal
        title="Add Payment"
        footer={false}
        visible={paymentModal}
        onOk={handleOkPayment}
        onCancel={handleCancelPayment}
      >
        <Form
          form={form}
          name="paymentForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            installments: false,
          }}
          onFinish={onFinishPayment}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Total Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your amount!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="installments"
            // label="Installments"
            valuePropName="checked"
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Checkbox>Installments</Checkbox>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.installments !== currentValues.installments
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("installments") ? (
                <Form.List name="paymentInstallments">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: "60%" }}
                          >
                            <PlusOutlined /> Add Installment
                          </Button>
                        </Form.Item>
                        {fields.map((field, index) => (
                          <div key={field.key}>
                            <Divider>Installment {index + 1}</Divider>
                            <Form.Item
                              name={[index, "amount"]}
                              label="Amount"
                              // labelCol={8}
                              // labelAlign={'left'}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter amount",
                                },
                              ]}
                              // wrapperCol={{
                              //     offset: 0,
                              //     span: 16,
                              // }}
                            >
                              <Input placeholder="Amount" />
                            </Form.Item>

                            <Form.Item
                              name={[index, "date"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select date",
                                },
                              ]}
                              label="Date"
                            >
                              <RangePicker />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <Button
                                type="danger"
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                                icon={<MinusCircleOutlined />}
                              >
                                Remove Above Field
                              </Button>
                            ) : null}
                          </div>
                        ))}
                        <Divider />
                      </div>
                    );
                  }}
                </Form.List>
              ) : null
            }
          </Form.Item>

          <Form.Item
            wrapperCol={{
              // offset: 8,
              span: 24,
            }}
          >
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Assign Staff Modal */}

      <Modal
        title="Assign Staff"
        footer={false}
        visible={staffModal}
        onOk={handleOkStaff}
        onCancel={handleCancelStaff}
      >
        {/* <p>{JSON.stringify(users)}</p> */}

        <Form
          form={assignForm}
          name="assign"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            date: "",
            paymentId: "",
            salary: "",
            assignStaff: "",
          }}
          onFinish={onFinishAssign}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="middle"
        >
          <Form.Item
            name="assignStaff"
            label="Assign Staff Member"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Assign Staff Member"
              // onChange={onChange}
            >
              {staff &&
                staff.length > 0 &&
                staff.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="salary"
            label="Staff Salary"
            rules={[{ required: true, message: "Please input your salary!" }]}
          >
            <Input placeholder="Salary" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please select date",
              },
            ]}
            label="Date"
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
          // wrapperCol={{
          //     // offset: ,
          //     span: 16,
          // }}
          >
            <Button type="primary" size="large" block htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row justify="space-between">
        <Col>
          <Title level={2}>Client Info</Title>
        </Col>
        <Col>
          <Button type="primary" size="large" onClick={showPaymentModal}>
            Add Payment
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={12}>
                <Title level={5}>
                  <Text type="primary"> Name</Text>
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5}>
                  <Text type="secondary">{data.name}</Text>
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5}>
                  <Text type="primary"> City</Text>
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5}>
                  <Text type="secondary">{data.city}</Text>
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5}>
                  <Text type="primary"> Address</Text>
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5}>
                  <Text type="secondary">{data.address}</Text>
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5}>
                  <Text type="primary"> Phone Number</Text>
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5}>
                  <Text type="secondary">{data.phoneNumber}</Text>
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5}>
                  <Text type="primary"> Diagnosis</Text>
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5}>
                  <Text type="secondary">{data.diagnosis}</Text>
                </Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify="end" className="mt-3">
        <Switch
          checkedChildren="open"
          unCheckedChildren="closed"
          onChange={(e) => statusUpdate(e)}         
          defaultChecked={data?.jobStatus === "open" ? true : false}
        />
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Ledger" key="1">
          {payments.length > 0 ? (
            payments.map((item, index) => (
              <CardInterface
                key={index}
                index={index + 1}
                data={item}
                showStaffModal={showStaffModal}
              />
            ))
          ) : (
            <Table
              columns={columns}
              dataSource={[]}
              size="small"
              rowKey={"_id"}
            />
          )}
        </TabPane>
        <TabPane tab="Payment History" key="2">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ["0"],
              // rowExpandable: (record) => record.installments,
              // expandIcon: () => <></>
            }}
            dataSource={payments}
            size="small"
            rowKey={"_id"}
          />
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

export default AssignStaff;

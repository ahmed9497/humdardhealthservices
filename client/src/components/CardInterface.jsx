import React from "react";
import {
  Form,
  Timeline,
  Modal,
  Input,
  DatePicker,
  Tabs,
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
import moment from "moment";

const { Title, Text } = Typography;

const CardInterface = ({ data ,showStaffModal,index}) => {
  return (
    <Card style={{marginBottom:10}}>
     <Row justify="end">
     <Button type='primary' onClick={() => showStaffModal(data)}>Assign Staff</Button>
     </Row>
      <Row>
        <Col span={12}>
          <Title level={5}>
            <Text type="primary">Sr No.</Text>
          </Title>
        </Col>
        <Col span={12}>
          <Title level={5}>
            <Text type="secondary">{index}</Text>
          </Title>
        </Col>
        <Col span={12}>
          <Title level={5}>
            <Text type="primary">Contractual Amount</Text>
          </Title>
        </Col>
        <Col span={12}>
          <Title level={5}>
            <Text type="secondary">{data.amount}</Text>
          </Title>
        </Col>
        <Col span={12}>
          <Title level={5}>
            <Text type="primary">Remaining Balance</Text>
          </Title>
        </Col>
        <Col span={12}>
          <Title level={5}>
            <Text type="secondary">{data.amount - data?.paidToStaff}</Text>
          </Title>
        </Col>
       
      </Row>
      <Row>
        <Col span={24}>
        <table style={{width:'100%', border:'1px solid black',borderCollapse: 'collapse'}}>
          <tr>
            <th>Date</th>
            <th>Staff</th>
            <th>Salary</th>
            <th>Balance</th>
          </tr>
            {data?.staffPayments.map((item,index)=>(
          <tr>

            <td>{moment(item?.date[0]).format('MMM DD ,YYYY')}-{moment(item?.date[1]).format('MMM DD ,YYYY')}</td>
            <td>{item?.assignStaff?.name}</td>
            <td>{item?.salary}</td>
            <td>{item?.remainingBalance}</td>

          
          </tr>
            ))}
        </table>
        </Col>
      </Row>
    </Card>
  );
};

export default CardInterface;

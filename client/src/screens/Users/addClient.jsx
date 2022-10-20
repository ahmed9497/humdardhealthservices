import React, { Fragment, useEffect, useState } from 'react'
import { Form, Input, Button, Typography, Row, Col, Select, message } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addClient, fetchRoles, fetchStaff } from '../../services/helper.service';



const { Title } = Typography;
const { Option } = Select;
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="+92">+92</Option>

        </Select>
    </Form.Item>
);



const AddClient = () => {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const params = useLocation();
    const queryParam = new URLSearchParams(params.search);
    const isAdmin = queryParam.get('admin');
    const [form] = Form.useForm();








    const onFinish = async (values) => {

        let req = {
            ...values,
            phoneNumber: `${values.prefix}${values.phoneNumber}`
        }

        delete req.prefix;
        console.log(req);

        
        let res = await addClient(req)
       
        if (res.code === "200") {
            message.success("Account Created Successfully")
            navigate('/dashboard/clients')
        }
        else {
            message.error(res?.message)
        }
    };

    const onFinishFailed = (errorInfo) => {

    };
    const onChange = (e) => {
        
        form.setFieldsValue({ modeOfService: e });
        // getStaff(e);
    }


    return (
        <Fragment>
            <Row justify='space-between'>
                <Col>
                    <Title level={2}>Add Client</Title>
                </Col>
            </Row>

            <Form
                form={form}
                name="AddClient"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    name: "",
                    city: "",
                    address: "",
                    phoneNumber: "",
                    serviceType: undefined,
                    prefix: "+92",
                    modeOfService: undefined,
                    diagnosis:""

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
                size='middle'

            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder='Name' />
                </Form.Item>



                <Form.Item
                    label="City"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your city!',
                        },
                    ]}
                >
                    <Input placeholder='City' />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input placeholder='Address' />
                </Form.Item>



                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input placeholder='Phone Number' addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="serviceType"  label="Service Type" rules={[{ required: true }]}>
                    <Select placeholder="Select Service">

                        <Option value={"Attendent"}>Attendent</Option>
                        <Option value={"Asistant Nurse"}>Asistant Nurse</Option>
                        <Option value={"Qualified Nurse"}>Qualified Nurse</Option>


                    </Select>
                </Form.Item>

               

                <Form.Item name="modeOfService" 
                 label="Mode of Service" rules={[{ required: true }]}>
                    <Select onChange={onChange}
                    placeholder="Select Mode of Service">
                        <Option value={"12h-Day"}>12h-Day</Option>
                        <Option value={"12h-Night"}>12h-Night</Option>
                        <Option value={"24h"}>24h</Option>



                    </Select>
                </Form.Item>
                <Form.Item name="diagnosis" label="Diagnosis" rules={[{ required: true }]}>
                <Input.TextArea placeholder='Diagnosis' rows={4} style={{ width: '100%' }} />
                </Form.Item>



             


                <Form.Item
                    wrapperCol={{
                        // offset: ,
                        span: 16,
                    }}
                >
                    <Button type="primary" size='large' block htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>

        </Fragment>
    )
}

export default AddClient;
import React, { Fragment } from 'react'
import { Form, Input, Button, InputNumber, Typography, Row, Col, Select, message } from 'antd';
import { addStaff } from '../../services/helper.service';



const { Title } = Typography;
const { Option } = Select;
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="+92">+92</Option>

        </Select>
    </Form.Item>
);



const AddStaff = () => {
  
    const onFinish = async (values) => {
        // let roleObj = roles.find(i=>i.id === values.roleId);
        // values.role_ela = roleObj.role_ela ;
        let req = {
            ...values,
            phoneNumber: `${values.prefix}${values.phoneNumber}`           
        }
        
        delete req.prefix;
        

        let res = await addStaff(req)
      
        if (res.code === "200") {
            message.success("Account Created Successfully")
            // if (isAdmin) {

            //     navigate('/dashboard/users/administrators')
            // }
            // else {
            //     navigate('/dashboard/users/npo')
            // }
        }
        else {
            message.error(res?.message)
        }
    };

    const onFinishFailed = (errorInfo) => {

    };



    return (
        <Fragment>
            <Row justify='space-between'>
                <Col>
                    <Title level={2}>Add Staff</Title>
                </Col>
            </Row>

            <Form
                name="addStaff"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    name: "",
                    cnic: "",
                    city: "",
                    address: "",
                    phoneNumber: "",
                    emergencyContact: "",
                    serviceType: undefined,
                    prefix: "+92",
                    brothers: "",
                    sisters: "",
                    availability:undefined
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
                    label="Cnic"
                    name="cnic"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your cnic!',
                        },
                    ]}
                >
                    <Input placeholder='CNIC' autoComplete='off' />
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

                <Form.Item name="serviceType" label="Service Type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select Service"
                    // onChange={onGenderChange}

                    >

                        <Option value={"Attendent"}>Attendent</Option>
                        <Option value={"Asistant Nurse"}>Asistant Nurse</Option>
                        <Option value={"Qualified Nurse"}>Qualified Nurse</Option>


                    </Select>
                </Form.Item>

                <Form.Item name="availability" label="Availability" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select Availability"
                        // onChange={onChange}

                    >

                        <Option value={"12h-Day"}>12h-Day</Option>
                        <Option value={"12h-Night"}>12h-Night</Option>
                        <Option value={"24h"}>24h</Option>



                    </Select>
                </Form.Item>


                <Form.Item
                    name="emergencyContact"
                    label="Emergency Contact"
                    rules={[{ required: true, message: 'Please input your emergency contact number!' }]}
                >
                    <Input placeholder='Phone Number' addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <div>Sibilings</div>
                <Row>
                    <Col span={6}>
                <Form.Item
                    name="brothers"
                    label="Brothers"
                    rules={[{ required: true, message: 'Please input your brother!' }]}

                >

                    <InputNumber min={1} max={10} />
                </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="sisters"
                        label="Sisters"
                        rules={[{ required: true, message: 'Please input your sisters!' }]}
                    >

                        <InputNumber min={1} max={10} />
                    </Form.Item>
                    </Col>
                </Row>
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

export default AddStaff;
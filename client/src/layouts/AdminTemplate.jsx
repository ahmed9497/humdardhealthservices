import React from 'react'
import { Layout, Menu, Breadcrumb, MenuProps, Col, Row, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserOutlined,VideoCameraOutlined
} from '@ant-design/icons';
import {MdOutlineDashboard} from 'react-icons/md'
import {GrOrganization} from 'react-icons/gr';
import {FaUsers,FaRegListAlt,FaSearch} from 'react-icons/fa';
import {MdAssignmentInd} from 'react-icons/md';
import { useState } from 'react';


const { Header, Content, Sider } = Layout;
const AdminTemplate = ({ children }) => {

    let navigate = useNavigate();
    const [responsive,setResponsive] =useState(true);
    const logout=()=>{
        localStorage.clear();
        navigate('/')
    }
    return (

        <Layout>
            <Header style={{ position: 'fixed', zIndex: 3, width: '100%' }}>
                <Row justify='space-between'>
                    <Col span={6}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}
                            items={[{ label: 'Humdard Health Services' }]}
                        />
                    </Col>
                    <Col >
                        <Button type='link' onClick={() => logout()}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Layout style={{ paddingTop: 64 }}>
                <Sider width={250} 
                 breakpoint="sm"
                 collapsedWidth="0"
                 onBreakpoint={(broken) => {
                   
                    setResponsive(broken)
                  }}
                 
                style={{ position: 'fixed', height: '100%',zIndex:2 }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            {
                                key: '1',
                                icon: <MdOutlineDashboard />,
                                label: <Link to="/dashboard/">Dashboard</Link>,
                    
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: <Link to="/dashboard/staff">Staff</Link>,
                               
                               
                            },
                            {
                                key: '3',
                                icon: <UserOutlined />,
                                label: <Link to="/dashboard/clients">Clients</Link>,
                               
                               
                            },
                            // {
                            //     key: '3',
                            //     icon: <FaUsers  size={22} color='green'/>,
                            //     label: <Link to="/dashboard/roles">Roles</Link>,
                            // },
                            // {
                            //     key: '4',
                            //     icon: <FaRegListAlt size={22} color='purple'/>,
                            //     label: <Link to="/dashboard/application-transfer">Application Transfer</Link>,
                            // },
                            // {
                            //     key: '5',
                            //     icon: <MdAssignmentInd size={22} color='#68b69d'/>,
                            //     label: <Link to="/dashboard/case-assignment">Case Assignment</Link>,
                            // },
                            // {
                            //     key: '6',
                            //     icon: <FaSearch />,
                            //     label: <Link to="/dashboard/organization">Total Search</Link>,
                            // },

                        ]}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', marginLeft: responsive?0:250 }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: `calc(100vh - 80px)`,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AdminTemplate
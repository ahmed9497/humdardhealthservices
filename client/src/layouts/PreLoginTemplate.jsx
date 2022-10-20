import React, { Fragment } from 'react'
import { Layout, Menu } from 'antd';
import { Navigate } from 'react-router-dom';



const { Header } = Layout;
const PreLoginTemplate = ({ children }) => {

    let auth = (localStorage.getItem('hamdard'));    
 
    let data = auth ? JSON?.parse(atob(auth)) :false;
    
    if (data && data?.userid === "SUPER_ADMIN") {
      return  <Navigate to={'/dashboard'} replace />;
    }

    return (
        <Fragment>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}
                    items={[{ key: '1', label: 'Humdard Health Services' }]} />
            </Header>
            {children}
        </Fragment>
    )
}

export default PreLoginTemplate
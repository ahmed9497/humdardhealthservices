import React, { Fragment,useState,useEffect, useRef } from 'react'
import { Table, Tag, Input,Space, Typography, Row, Col, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../services/helper.service';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;





const NpoTable = ({dataSource}) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
      };
    const columns = [
        {
            title: 'S.No',
            // dataIndex: 'username',
            key: 'id',
            render: (text,record,index) => <div>{index+1}</div>,
            // sorter: (a, b) => a.username.length - b.username.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'User Id',
            dataIndex: 'userid',
            key: 'id',
            render: (text,record,index) => <div>{text}</div>,
            ...getColumnSearchProps('userid'),
            // sorter: (a, b) => a.username.length - b.username.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('username'),
            sorter: (a, b) => a.username.length - b.username.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'id',
            render: text => <div>{text}</div>,
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend'],
        },
       
        {
            title: 'Role',
            key: 'id',
            dataIndex: 'role_name',
            render: role => (
               
                            <Tag color={'green'} key={role}>
                                {role}
                            </Tag>
                        
                   
            ),
        },
        {
            title:'Status',
            key:'isverified',
            dataIndex: 'isverified',
            render: isverified => (
               
                            <Tag color={isverified ?'green' :'red'} >
                                {isverified ? "Verified" :"Not Verified"}
                            </Tag>
                        
                   
            ),
        },
        
    ];
   
  


    return (
        <Fragment>         
            {dataSource?.length >0 &&<Table columns={columns} dataSource={dataSource} rowKey={'id'} />}
        </Fragment>

    )
}

export default NpoTable;
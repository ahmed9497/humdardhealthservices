import React, { Fragment,useState,useEffect, useRef } from 'react'
import { Table, Tag, Input,Space, Typography, Row, Col, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fetchClients, fetchStaff, fetchUsers } from '../../services/helper.service';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;





const ClientListing = () => {
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
            key: '_id',
            render: (text,record,index) => <div>{index+1}</div>,
            // sorter: (a, b) => a.username.length - b.username.length,
            // sortDirections: ['descend', 'ascend'],
        },
        // {
        //     title: 'User Id',
        //     dataIndex: 'userid',
        //     key: 'id',
        //     render: (text,record,index) => <div>{text}</div>,
        //     ...getColumnSearchProps('userid'),
        //     // sorter: (a, b) => a.username.length - b.username.length,
        //     // sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: '_id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: '_id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('city'),
            sorter: (a, b) => a.city.length - b.city.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '_id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: '_id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            key: '_id',
            render: text => <div>{text.toUpperCase()}</div>,
            ...getColumnSearchProps('serviceType'),
            sorter: (a, b) => a.serviceType.length - b.serviceType.length,
            sortDirections: ['descend', 'ascend'],
        },
         
       
        {
            title: 'Action',
            key: '_id',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='link' onClick={()=>navigate(`/dashboard/client/assign/staff/${encodeURIComponent(btoa(JSON.stringify(record)))}`)}>View</Button>
                    {/* <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                    <Button type='link'>Delete</Button>
                  </Popconfirm>
                    </div> */}
                </Space>
            ),
        },
    ];
    const [users,setUsers] =useState([])



    useEffect(() => {


       
        getUsers();

    }, []);

    const getUsers = async () => {
        try {
          let req={};
            const res = await fetchClients(req);
            
            if (res.code === "200") {
                setUsers(res.data)
            }
        } catch (error) {
            console.log(error)
        }
       
    }
    const handleDelete=async(record)=>{
      
        let req={
            id:record.id
        }
        let res = await deleteUser(req)
      
           if(res.code === "200"){
             message.success("User Deleted Successfully");
             getUsers();
          } 
      }


    return (
        <Fragment>
            <Row justify='space-between'>
                <Col>
                    <Title level={2}>Client Listing</Title>
                </Col>
                <Col>
                    <Button type="primary" block ghost onClick={()=>navigate('/dashboard/client/add')}>
                        Add Client
                    </Button>
                </Col>
            </Row>
            {users?.length >0 &&<Table size={'small'} columns={columns} dataSource={users} rowKey={'_id'} />}
        </Fragment>

    )
}

export default ClientListing;
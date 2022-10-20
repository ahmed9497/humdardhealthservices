
import { Table, Input, Space, Button } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
const MyTable = ({ dataSource, type }) => {

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
      title: 'Application Initiated',
      key: 'applicationInitiationDate',
      render: text => <div>{moment(text).format('DD-MM-YYYY')}</div>

    },
    {
      title: 'Application Type',
      dataIndex: 'applicationType',
      key: 'applicationType',
      ...getColumnSearchProps('applicationType'),
      sorter: (a, b) => a?.applicationType?.length - b?.applicationType?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Assigne',
      dataIndex: 'assigne',
      key: 'assigne',
      ...getColumnSearchProps('assigne'),
      sorter: (a, b) => a?.assigne?.length - b?.assigne?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Organization Name',
      dataIndex: 'nameofOrganization',
      key: 'nameofOrganization',
      ...getColumnSearchProps('nameofOrganization'),
      sorter: (a, b) => a?.nameofOrganization?.length - b?.nameofOrganization?.length,
      sortDirections: ['descend', 'ascend'],


    },
    {
      title: 'Certification Type',
      dataIndex: 'certificationType',
      key: 'certificationType',
      ...getColumnSearchProps('certificationType'),
      sorter: (a, b) => a?.certificationType?.length - b?.certificationType?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Date of Fee Submission',
      dataIndex: 'dateofFeeSubmission',
      key: 'dateofFeeSubmission',
      ...getColumnSearchProps('dateofFeeSubmission'),
      sorter: (a, b) => a?.dateofFeeSubmission?.length - b?.dateofFeeSubmission?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Focal Person Name',
      dataIndex: 'focalPersonName',
      key: 'focalPersonName',
      ...getColumnSearchProps('focalPersonName'),
      sorter: (a, b) => a?.focalPersonName?.length - b?.focalPersonName?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Focal Person Mobile Number',
      dataIndex: 'focalPersonMobileNumber',
      key: 'focalPersonMobileNumber',
      ...getColumnSearchProps('focalPersonMobileNumber'),
      sorter: (a, b) => a?.focalPersonMobileNumber?.length - b?.focalPersonMobileNumber?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Head Office Address',
      dataIndex: 'headOfficeAddress',
      key: 'headOfficeAddress',
      ...getColumnSearchProps('headOfficeAddress'),
      sorter: (a, b) => a?.headOfficeAddress?.length - b?.headOfficeAddress?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Head Office City',
      dataIndex: 'headOfficeCity',
      key: 'headOfficeCity',
      ...getColumnSearchProps('headOfficeCity'),
      sorter: (a, b) => a?.headOfficeCity?.length - b?.headOfficeCity?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Lead',
      dataIndex: 'lead',
      key: 'lead',
      ...getColumnSearchProps('lead'),
      sorter: (a, b) => a?.lead?.length - b?.lead?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Registration Law',
      dataIndex: 'registrationlaw',
      key: 'registrationlaw',
      ...getColumnSearchProps('registrationlaw'),
      sorter: (a, b) => a?.registrationlaw?.length - b?.registrationlaw?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      key: 'reviewer',
      ...getColumnSearchProps('reviewer'),
      sorter: (a, b) => a?.reviewer?.length - b?.reviewer?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Support',
      dataIndex: 'support',
      key: 'support',
      ...getColumnSearchProps('support'),
      sorter: (a, b) => a?.support?.length - b?.support?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a?.status?.length - b?.status?.length,
      sortDirections: ['descend', 'ascend'],

    },
    // {
    //   title: 'Created time',
    //   key: 'createdtime',
    //   render:text=> <div>{moment(text).format('DD-MM-YYYY')}</div>
    // },
  ];


  return (
    <Table scroll={{ x: 2000, }} dataSource={dataSource} columns={columns} />
  )
}

export default MyTable
import React, { useEffect, useState } from 'react';
import { Input, Table, Button, Modal, Form, Spin, Alert } from 'antd';
import { portfolioStore } from '../stores/PortfolioStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const { Search } = Input;

const PortfolioPage: React.FC = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStock, setEditingStock] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    portfolioStore.fetchPortfolio(portfolioStore.userId); // Fetch portfolio on load
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Update search term on user input
  };

  const filteredPortfolio = portfolioStore.portfolio.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by name
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) // Search by Symbol
  );

  const handleAddStock = () => {
    form.validateFields().then(values => {
      if (isEditing) {
        portfolioStore.editStock(editingStock._id, values);
        setIsEditing(false);
      } else {
        portfolioStore.addStock(values);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text: string) => <Link to={`/stock/${text}`}>{text}</Link>, // Navigate to stock details page
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setIsEditing(true);
              setEditingStock(record);
              setIsModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => portfolioStore.removeStock(record._id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {portfolioStore.loading && <Spin size="large" />}
      {portfolioStore.error && <Alert message={portfolioStore.error} type="error" />}
      <div className="header">Your Stock Portfolio</div>
      <div className="search">
        <Search
          placeholder="Search stocks"
          onSearch={handleSearch}
          onChange={e => handleSearch(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </div>
      <Button
        type="primary"
        onClick={() => {
          setIsEditing(false);
          setIsModalVisible(true);
          form.resetFields();
        }}
        style={{ marginBottom: '20px' }}
      >
        Add Stock
      </Button>
      <Table
        dataSource={filteredPortfolio} // Use the filtered portfolio
        columns={columns}
        rowKey="_id"
      />
      <Modal
        title={isEditing ? 'Edit Stock' : 'Add Stock'}
        open={isModalVisible} // Updated
        onOk={handleAddStock}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Symbol"
            name="symbol"
            rules={[{ required: true, message: 'Please enter the stock symbol' }]}
          >
            <Input disabled={isEditing} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the stock name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default PortfolioPage;

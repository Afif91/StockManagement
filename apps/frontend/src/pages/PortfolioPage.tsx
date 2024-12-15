import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Spin, Alert } from 'antd';
import { portfolioStore } from '../stores/PortfolioStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './PortfolioPage.scss';

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
    setSearchTerm(value);
    portfolioStore.setSearchTerm(value); // Pass the search term to the store
  };

  const handleAddStock = () => {
    form.validateFields().then((values) => {
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
      render: (text: string) => <Link to={`/stock/${text}`}>{text}</Link>,
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
    <div className="portfolio-page">
    {portfolioStore.loading && <Spin size="large" />}
    {portfolioStore.error && <Alert message={portfolioStore.error} type="error" />}
    <div className="header">Stock Portfolio</div>
      <div className="search-bar">
        <Search
          placeholder="Search stocks"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </div>

      {/* Add Stock Button */}
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

      {/* Table */}
      <Table
        dataSource={portfolioStore.filteredPortfolio} // Use filteredPortfolio from store
        columns={columns}
        rowKey="_id"
      />

      {/* Modal for Adding/Editing Stocks */}
      <Modal
        title={isEditing ? 'Edit Stock' : 'Add Stock'}
        open={isModalVisible}
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
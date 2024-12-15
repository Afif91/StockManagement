import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar: React.FC = () => (
  <Header>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">Portfolio</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { portfolioStore } from '../stores/PortfolioStore';
import { Slider, Collapse, Input, Button } from 'antd';
import {
  PieChartOutlined,
  FilterOutlined,
  DollarOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  CheckOutlined,
  RedoOutlined,
} from '@ant-design/icons';

const Sidebar: React.FC = observer(() => {
  const [symbolFilter, setSymbolFilter] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [quantityRange, setQuantityRange] = useState<[number, number]>([0, 100]);

  const applyFilters = () => {
    portfolioStore.setFilters({
      symbol: symbolFilter,
      priceRange,
      quantityRange,
    });
  };

  const resetFilters = () => {
    setSymbolFilter('');
    setPriceRange([0, 1000]);
    setQuantityRange([0, 100]);
    portfolioStore.setFilters({
      symbol: '',
      priceRange: [0, 1000],
      quantityRange: [0, 100],
    });
  };

  // Define items for Collapse
  const collapseItems = [
    {
      key: '1',
      label: (
        <>
          <TagOutlined /> Symbol
        </>
      ),
      children: (
        <Input
          placeholder="Enter symbol"
          value={symbolFilter}
          onChange={(e) => setSymbolFilter(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      ),
    },
    {
      key: '2',
      label: (
        <>
          <DollarOutlined /> Price Range
        </>
      ),
      children: (
        <>
          <Slider
            range
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={(value: number[]) => setPriceRange(value as [number, number])}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1]}</span>
          </div>
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <ShoppingCartOutlined /> Quantity Range
        </>
      ),
      children: (
        <>
          <Slider
            range
            min={0}
            max={100}
            step={1}
            value={quantityRange}
            onChange={(value: number[]) => setQuantityRange(value as [number, number])}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span>Min: {quantityRange[0]}</span>
            <span>Max: {quantityRange[1]}</span>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="sidebar">
      {/* Navigation Section */}
      <div className="sidebar-navigation">
        <div className="sidebar-item">
          <Link to="/">
            <PieChartOutlined style={{ fontSize: '18px' }} /> Portfolio
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/analytics">
            <DollarOutlined style={{ fontSize: '18px' }} /> Analytics
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sidebar-filters">
        <h3>
          <FilterOutlined style={{ marginRight: '5px' }} /> Filters
        </h3>
        <Collapse bordered={false} items={collapseItems} />

        {/* Buttons Section */}
        <div className="buttons">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={applyFilters}
            style={{ marginRight: '10px' }}
          >
            Apply
          </Button>
          <Button
            type="default"
            icon={<RedoOutlined />}
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
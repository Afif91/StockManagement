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

const { Panel } = Collapse;

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
        <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
          {/* Symbol Filter */}
          <Panel header={<><TagOutlined /> Symbol</>} key="1">
            <Input
              placeholder="Enter symbol"
              value={symbolFilter}
              onChange={(e) => setSymbolFilter(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </Panel>

          {/* Price Range Filter */}
          <Panel header={<><DollarOutlined /> Price Range</>} key="2">
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
          </Panel>

          {/* Quantity Range Filter */}
          <Panel header={<><ShoppingCartOutlined /> Quantity Range</>} key="3">
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
          </Panel>
        </Collapse>

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
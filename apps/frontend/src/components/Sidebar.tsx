import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { portfolioStore } from '../stores/PortfolioStore';
import { PieChartOutlined, FilterOutlined, DollarOutlined } from '@ant-design/icons';

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

        {/* Symbol Filter */}
        <div className="filter-item">
          <label>Symbol:</label>
          <input
            type="text"
            value={symbolFilter}
            onChange={(e) => setSymbolFilter(e.target.value)}
            placeholder="Enter symbol"
          />
        </div>

        {/* Price Range Filter */}
        <div className="filter-item">
          <label>Price Range:</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            placeholder="Min price"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            placeholder="Max price"
          />
        </div>

        {/* Quantity Range Filter */}
        <div className="filter-item">
          <label>Quantity Range:</label>
          <input
            type="number"
            value={quantityRange[0]}
            onChange={(e) => setQuantityRange([Number(e.target.value), quantityRange[1]])}
            placeholder="Min quantity"
          />
          <input
            type="number"
            value={quantityRange[1]}
            onChange={(e) => setQuantityRange([quantityRange[0], Number(e.target.value)])}
            placeholder="Max quantity"
          />
        </div>

        <button onClick={applyFilters} className="apply-filters-button">
          Apply Filters
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
import React from 'react';
import { observer } from 'mobx-react-lite';
import { portfolioStore } from '../stores/PortfolioStore';
import { Card } from 'antd';
import '../styles/AnalyticsPage.scss';

const AnalyticsPage: React.FC = observer(() => {
  const totalValue = portfolioStore.portfolio.reduce(
    (sum, stock) => sum + stock.price * stock.quantity,
    0
  );
  const totalQuantity = portfolioStore.portfolio.reduce(
    (sum, stock) => sum + stock.quantity,
    0
  );
  const averagePrice = totalQuantity
    ? (totalValue / totalQuantity).toFixed(2)
    : 0;

  return (
    <div className="analytics-page">
      <h2>Portfolio Analytics</h2>
      <div className="analytics-cards">
        <Card title="Total Portfolio Value" style={{ width: 300 }}>
          ${totalValue.toFixed(2)}
        </Card>
        <Card title="Total Quantity" style={{ width: 300 }}>
          {totalQuantity}
        </Card>
        <Card title="Average Stock Price" style={{ width: 300 }}>
          ${averagePrice}
        </Card>
      </div>
    </div>
  );
});

export default AnalyticsPage;
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { portfolioStore } from '../stores/PortfolioStore';
import { observer } from 'mobx-react-lite';

const StockDetailsPage: React.FC = observer(() => {
  const { symbol } = useParams<{ symbol: string }>();

  useEffect(() => {
    if (!symbol) {
      portfolioStore.setError('No stock symbol provided!');
      return;
    }
    portfolioStore.fetchStockDetails(symbol); // Calls the store to fetch stock details
  }, [symbol]);

  if (portfolioStore.loading) return <Spin size="large" />;
  if (portfolioStore.error) return <Alert message={portfolioStore.error} type="error" />;

  const stock = portfolioStore.stockDetails; // Automatically updates when MobX store changes
  if (!stock) return <div>No stock details available.</div>;

  return (
    <div className="stock-details">
      <Card title={`${stock.name} (${stock.symbol})`}>
        <p>Latest Quote: ${stock.price}</p>
        <p>Today's Change: {stock.changesPercentage}%</p>
      </Card>
    </div>
  );
});

export default StockDetailsPage;
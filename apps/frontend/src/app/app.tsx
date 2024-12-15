import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PortfolioPage from '../pages/PortfolioPage';
import StockDetailsPage from '../pages/StockDetailsPage';
import '../styles/Layout.scss';
import ErrorBoundary from '../components/ErrorBoundary';
import Sidebar from '../components/Sidebar';
import AnalyticsPage from '../pages/AnalyticsPage';

const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/stock/:symbol" element={<StockDetailsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
// // Uncomment this line to use CSS modules
// // import styles from './app.module.scss';
// import NxWelcome from './nx-welcome';

// export function App() {
//   return (
//     <div>
//       <NxWelcome title="frontend" />
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import '../styles/Layout.scss';
// import Navbar from '../components/Navbar';
// import PortfolioPage from '../pages/PortfolioPage';
// import StockDetailsPage from '../pages/StockDetailsPage';

// const App: React.FC = () => (
//   <BrowserRouter>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<PortfolioPage />} />
//       <Route path="/stock/:symbol" element={<StockDetailsPage />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default App;




import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PortfolioPage from '../pages/PortfolioPage';
import StockDetailsPage from '../pages/StockDetailsPage';
import '../styles/Layout.scss';
import ErrorBoundary from '../components/ErrorBoundary';

const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <div className="layout">
        <div className="sidebar">
          <div>
            <div className="sidebar-item">
              <Link to="/">your stocks</Link>
            </div>
            <div className="sidebar-item">sidebar filler</div>
            <div className="sidebar-item">sidebar filler</div>
          </div>
          <div className="sidebar-item logout">log out</div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/stock/:symbol" element={<StockDetailsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;

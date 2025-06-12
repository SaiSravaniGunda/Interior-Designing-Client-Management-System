import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClientDashboard from './pages/ClientDashboard';
import DesignerDashboard from './pages/DesignerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Navbar from './components/Navbar';
import CreatePortfolio from './pages/CreatePortfolio';
import ExploreDesigners from './pages/ExploreDesigners';
import DesignerPortfolio from './pages/DesignerPortfolio';
import ProjectRequestForm from './components/clients/ProjectRequestForm';
import PendingProjects from './components/designers/PendingProjects';
import ProjectProgress from './components/designers/ProjectProgress';
import ClientProjectProgress from './components/clients/ClientProjectProgress ';
import MyDesigners from './components/clients/MyDesigners';
import MyClient from './components/designers/MyClient';
import Chat from './components/Chat';
import CompletedProjects from './components/designers/CompletedProjects';
import MyShop from './components/vendors/MyShop';
import AddProduct from './components/vendors/AddProduct';
import VendorProducts from './components/vendors/VendorProducts';
import ShopPage from './components/ShopPage';
import CartPage from './components/clients/CartPage';
import ViewProducts from './components/clients/ViewProducts';
import VendorOrders from './components/vendors/VendorOrders';
import MyOrders from './components/clients/MyOrders';
import HomePage from './pages/HomePage';

// ✅ PrivateRoute now takes children
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/client-dashboard" element={<PrivateRoute><ClientDashboard /></PrivateRoute>} />
          <Route path="/create-portfolio" element={<PrivateRoute><CreatePortfolio /></PrivateRoute>} />
          <Route path="/designer-dashboard" element={<PrivateRoute><DesignerDashboard /></PrivateRoute>} />
          <Route path="/portfolios" element={<PrivateRoute><ExploreDesigners /></PrivateRoute>} />
          <Route path="/portfolio/:portfolioId" element={<PrivateRoute><DesignerPortfolio /></PrivateRoute>} />
          <Route path="/new-project-request" element={<PrivateRoute><ProjectRequestForm /></PrivateRoute>} />
          <Route path="/vendor-dashboard" element={<PrivateRoute><VendorDashboard /></PrivateRoute>} />
          <Route path="/designer/project-requests" element={<PrivateRoute><PendingProjects /></PrivateRoute>} />
          <Route path="/designer/project-progress" element={<PrivateRoute><ProjectProgress /></PrivateRoute>} />
          <Route path="/my-projects" element={<PrivateRoute><ClientProjectProgress /></PrivateRoute>} />
          <Route path="/my-designers" element={<PrivateRoute><MyDesigners /></PrivateRoute>} />
          <Route path="/designer/my-clients" element={<PrivateRoute><MyClient /></PrivateRoute>} />
          <Route path="/chat/:senderId/:recipientId" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/designer/completed-projects" element={<PrivateRoute><CompletedProjects /></PrivateRoute>} />
          <Route path="/my-shop" element={<PrivateRoute><MyShop /></PrivateRoute>} />
          <Route path="/vendor/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/vendor/view-products" element={<PrivateRoute><VendorProducts /></PrivateRoute>} />
          <Route path="/shops" element={<PrivateRoute><ShopPage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/view-products" element={<PrivateRoute><ViewProducts /></PrivateRoute>} />
          <Route path="/vendor/view-orders" element={<PrivateRoute><VendorOrders /></PrivateRoute>} />
          <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

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

// ✅ PrivateRoute component
const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
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
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/client-dashboard" element={<PrivateRoute element={<ClientDashboard />} />} />
          <Route path="/create-portfolio" element={<PrivateRoute element={<CreatePortfolio />} />} />
          <Route path="/designer-dashboard" element={<PrivateRoute element={<DesignerDashboard />} />} />
          <Route path="/portfolios" element={<PrivateRoute element={<ExploreDesigners />} />} />
          <Route path="/portfolio/:portfolioId" element={<PrivateRoute element={<DesignerPortfolio />} />} />
          <Route path="/new-project-request" element={<PrivateRoute element={<ProjectRequestForm />} />} />
          <Route path="/vendor-dashboard" element={<PrivateRoute element={<VendorDashboard />} />} />
          <Route path="/designer/project-requests" element={<PrivateRoute element={<PendingProjects />} />} />
          <Route path="/designer/project-progress" element={<PrivateRoute element={<ProjectProgress />} />} />
          <Route path="/my-projects" element={<PrivateRoute element={<ClientProjectProgress />} />} />
          <Route path="/my-designers" element={<PrivateRoute element={<MyDesigners />} />} />
          <Route path="/designer/my-clients" element={<PrivateRoute element={<MyClient />} />} />
          <Route path="/chat/:senderId/:recipientId" element={<PrivateRoute element={<Chat />} />} />
          <Route path="/designer/completed-projects" element={<PrivateRoute element={<CompletedProjects />} />} />
          <Route path="/my-shop" element={<PrivateRoute element={<MyShop />} />} />
          <Route path="/vendor/add-product" element={<PrivateRoute element={<AddProduct />} />} />
          <Route path="/vendor/view-products" element={<PrivateRoute element={<VendorProducts />} />} />
          <Route path="/shops" element={<PrivateRoute element={<ShopPage />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
          <Route path="/view-products" element={<PrivateRoute element={<ViewProducts />} />} />
          <Route path="/vendor/view-orders" element={<PrivateRoute element={<VendorOrders />} />} />
          <Route path="/my-orders" element={<PrivateRoute element={<MyOrders />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

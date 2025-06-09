import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClientDashboard from './pages/ClientDashboard';
import DesignerDashboard from './pages/DesignerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/create-portfolio" element={<CreatePortfolio/>}/>
          <Route path="/designer-dashboard" element={<DesignerDashboard />} />
          <Route path="/portfolios" element={<ExploreDesigners/>}/>
          <Route path='/portfolio/:portfolioId' element={<DesignerPortfolio/>}/>
          <Route path="/new-project-request" element={<ProjectRequestForm/>}/>
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="designer/project-requests" element={<PendingProjects/>}/>
          <Route path="/designer/project-progress" element={<ProjectProgress/>}/>
          <Route path="/my-projects" element={<ClientProjectProgress/>}/>
          <Route path="/my-designers" element={<MyDesigners/>}/>
          <Route path="/designer/my-clients" element={<MyClient/>}/>
          <Route path="/chat/:senderId/:recipientId" element={<Chat />} />
          <Route path="/designer/completed-projects" element={<CompletedProjects/>}/>
          <Route path="/my-shop" element={<MyShop/>}/>
          <Route path="/vendor/add-product" element={<AddProduct/>}/>
          <Route path="/vendor/view-products" element={<VendorProducts/>}/>
          <Route path="/shops" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/view-products" element={<ViewProducts/>}/>
          <Route path="/vendor/view-orders" element={<VendorOrders/>}/>
          <Route path="/my-orders" element={<MyOrders/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

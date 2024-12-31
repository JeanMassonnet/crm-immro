import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import EditProperty from './pages/EditProperty';
import BuyerSearches from './pages/BuyerSearches';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/new" element={<EditProperty />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="properties/:id/edit" element={<EditProperty />} />
          <Route path="searches" element={<BuyerSearches />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/app/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
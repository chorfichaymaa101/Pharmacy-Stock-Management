import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import MedicinesPage from "./pages/MedicinesPage";
import StockPage from "./pages/StockPage";
import SuppliersPage from "./pages/SuppliersPage";
import OrdersPage from "./pages/OrdersPage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import ActivityPage from "./pages/ActivityPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { AddMedicineForm } from "./pages/AddMedecineForm";
import { UpdateMedicineForm } from "./pages/UpdateMedicineForm";
import { UpdateStockForm } from "./pages/UpdateStockForm";
import { AddSupplierForm } from "./pages/AddSupplierForm";
import { EditSupplierForm } from "./pages/EditSupplierForm";
import { AddOrderForm } from "./pages/AddOrderForm";
import { AddSaleForm } from "./pages/AddSaleForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="/add-medicine" element={<AddMedicineForm />} />
            <Route path="/update-medicine" element={<UpdateMedicineForm />} />
            <Route path="/update-stock" element={<UpdateStockForm />} />
            <Route path="/add-supplier" element={<AddSupplierForm />} />
            <Route path="/edit-supplier/:id" element={<EditSupplierForm />} />
            <Route path="/add-order" element={<AddOrderForm />} />
            <Route path="/add-sale" element={<AddSaleForm />} />
          
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

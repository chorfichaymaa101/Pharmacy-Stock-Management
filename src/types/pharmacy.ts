export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  dosageForm: string;
  strength: string;
  packaging: string;
  barcode: string;
  supplierId: string;
  unitCost: number;
  sellingPrice: number;
  category: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Batch {
  id: string;
  medicineId: string;
  batchNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  quantity: number;
  initialQuantity: number;
  location: string;
  supplierId: string;
  unitCost: number;
  createdAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  leadTime: number;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  status: 'pending' | 'received' | 'partial' | 'delayed' | 'cancelled';
  orderDate: Date;
  expectedDelivery: Date;
  actualDelivery?: Date;
  totalAmount: number;
  items: PurchaseOrderItem[];
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  medicineId: string;
  quantity: number;
  unitCost: number;
  receivedQuantity: number;
  totalCost: number;
}

export interface Sale {
  id: string;
  saleNumber: string;
  customerName?: string;
  customerPhone?: string;
  prescriptionId?: string;
  saleDate: Date;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: 'cash' | 'card' | 'insurance';
  items: SaleItem[];
  status: 'completed' | 'pending' | 'cancelled';
}

export interface SaleItem {
  id: string;
  medicineId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  dosageInstructions?: string;
}

export interface StockAlert {
  id: string;
  type: 'low_stock' | 'expiry_warning' | 'expired' | 'out_of_stock';
  medicineId: string;
  batchId?: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'pharmacist' | 'technician' | 'manager' | 'admin';
  isActive: boolean;
  createdAt: Date;
}

export interface DashboardMetrics {
  totalMedicines: number;
  totalStock: number;
  totalValue: number;
  lowStockAlerts: number;
  expiryAlerts: number;
  todaySales: number;
  pendingOrders: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'sale' | 'purchase' | 'stock_update' | 'alert';
  description: string;
  timestamp: Date;
  userId: string;
}
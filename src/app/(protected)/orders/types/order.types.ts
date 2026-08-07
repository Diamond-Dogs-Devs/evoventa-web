export interface OrderI {
  id: string;
  orderNumber: string;
  totalAmount: number;
  totalItems: number;
  type: string;
  status: string;
  isActive: boolean;
  clientId: string;
  clientName?: string;
  userId: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderUserI {
  id: string;
  name: string;
}

export interface OrderClientI {
  id: string;
  name: string;
}

export interface OrderLineItemI {
  price: number;
  quantity: number;
  productId: string;
  name: string;
}

export interface OrderDetailI extends OrderI {
  OrderItem: OrderLineItemI[];
}

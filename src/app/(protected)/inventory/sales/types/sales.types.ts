export interface InventoryI {
  id: number;
  name: string;
  description: string;
}

export interface ProductI {
  id: number;
  barcode: string;
  name: string;
  salePrice: number;
  brand: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface InventoryProductI {
  id: number;
  inventoryId: number;
  productId: number;
  quantity: number;
  product: ProductI;
}

export interface ClientI {
  id: string;
  name: string;
  telephone: string;
  email: string;
  address: string;
}

export interface CartItemI {
  inventoryProduct: InventoryProductI;
  quantity: number;
}

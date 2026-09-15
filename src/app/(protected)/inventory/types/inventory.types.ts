export interface InventoryI {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductI {
  id: number;
  name: string;
  salePrice: number;
  brand: string;
  category: string;
  status: string;
  stock: number;
  barcode: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryProductI {
  id: number;
  inventoryId: number;
  productId: number;
  quantity: number;
  product: ProductI;
  InventoryItem: Array<ProductI>;
}

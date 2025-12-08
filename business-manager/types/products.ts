export { }

declare global {

  interface ProductFilters {
    category: string;
    stockStatus: string;
    search: string;
  }

  interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    currentStock: number;
    minStock: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
    tags?: string[];
    supplier: string;
    image: string;
    secureImage: string;
  }

  interface ProductFormData {
    name: string;
    description: string;
    category?: string;
    minStock: number;
    tags?: string[];
  }
}
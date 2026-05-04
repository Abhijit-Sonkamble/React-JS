export interface ProductType {
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    description: string;
}

export interface ProductFetchType {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    description: string;
}

export interface CartItem {
    id: string;
    quantity: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    description: string;
}
import type { ProductFetchType, ProductType } from "../utils/global";

// Backend API endpoint changed to products
const API_URL = "http://localhost:8000/products/";

export const addProduct = async (body: ProductType) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.ok;
}

export const fetchAllProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
}

export const deleteProduct = async (id: string) => {
    const res = await fetch(API_URL + id, { 
        method: "DELETE" 
    });
    return res.ok;
}

export const fetchSingleProduct = async (id: string) => {
    const res = await fetch(API_URL + id, { 
        method: "GET" 
    });
    const data = await res.json();
    return data;
}

export const updateProduct = async (body: ProductFetchType) => {
    const res = await fetch(API_URL + body.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.ok;
}
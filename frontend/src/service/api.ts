// frontend/src/services/productService.ts
const BASE_URL = "http://localhost:8080/products";

export async function getProducts() {
    const response = await fetch(BASE_URL);
    return response.json();
}

export async function createProduct(product: { name: string; price: number; userId?: number }) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return response.json();
}

export async function deleteProduct(id: number) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
import { startTransition, useCallback, useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../service/api";

interface Product {
    id: number;
    name: string;
    price: number;
}

export default function ProductsItem() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);

    const fetchProducts = useCallback(async () => {
        const data = await getProducts();
        startTransition(() => {
            setProducts(data);
        });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    async function handleCreate() {
        if (!name || price <= 0) return;
        await createProduct({ name, price });
        setName("");
        setPrice(0);
        fetchProducts();
    }

    async function handleDelete(id: number) {
        await deleteProduct(id);
        fetchProducts();
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Products</h1>

            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1 rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="border p-1 rounded"
                />
                <button onClick={handleCreate} className="bg-blue-500 text-white px-2 rounded">
                    Add Product
                </button>
            </div>

            <ul>
                {products.map((p) => (
                    <li key={p.id} className="flex justify-between border-b py-1">
                        {p.name} - ${p.price}
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-500 text-white px-2 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string;
    stock: number;
    sku?: string;
    is_active: boolean;
}

interface Sale {
    id: number;
    total: string;
    payment_method: string;
    created_at: string;
    user: {
        name: string;
    };
    items: Array<{
        quantity: number;
        unit_price: string;
        total_price: string;
        product: {
            name: string;
        };
    }>;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface Props {
    products: Product[];
    recentSales: Sale[];
    [key: string]: unknown;
}

export default function Pos({ products, recentSales }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [processing, setProcessing] = useState<boolean>(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const addToCart = (product: Product) => {
        if (product.stock <= 0) return;

        const existingItem = cart.find(item => item.product.id === product.id);
        if (existingItem) {
            if (existingItem.quantity >= product.stock) return;
            
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const product = products.find(p => p.id === productId);
        if (!product || quantity > product.stock) return;

        setCart(cart.map(item =>
            item.product.id === productId
                ? { ...item, quantity }
                : item
        ));
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (parseFloat(item.product.price) * item.quantity);
        }, 0);
    };

    const completeSale = () => {
        if (cart.length === 0) return;
        
        setProcessing(true);
        
        const saleData = {
            items: cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity
            })),
            payment_method: paymentMethod,
            tax: 0
        };

        router.post(route('sales.store'), saleData, {
            onSuccess: () => {
                clearCart();
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const total = calculateTotal();

    return (
        <AppShell>
            <Head title="Point of Sale" />
            
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/* Products Section */}
                <div className="flex-1 p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            🏪 Point of Sale
                        </h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className={`cursor-pointer rounded-lg border p-4 transition-colors hover:border-orange-500 ${
                                    product.stock <= 0
                                        ? 'border-gray-200 bg-gray-100 opacity-50 dark:border-gray-700 dark:bg-gray-800'
                                        : 'border-gray-200 bg-white hover:shadow-md dark:border-gray-600 dark:bg-gray-700'
                                }`}
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {product.description}
                                    </p>
                                )}
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </span>
                                    <span className={`text-sm ${
                                        product.stock <= 5
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                                {product.sku && (
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        SKU: {product.sku}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="w-96 border-l border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        🛒 Cart
                    </h2>

                    <div className="mb-4 flex-1 overflow-y-auto">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                Cart is empty
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                ${parseFloat(item.product.price).toFixed(2)} each
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-8 text-center text-gray-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <>
                            <div className="border-t border-gray-200 pt-4 dark:border-gray-600">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="cash">💵 Cash</option>
                                        <option value="credit_card">💳 Credit Card</option>
                                        <option value="debit_card">💳 Debit Card</option>
                                    </select>
                                </div>

                                <div className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Total: ${total.toFixed(2)}
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={completeSale}
                                        disabled={processing}
                                        className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600"
                                    >
                                        {processing ? 'Processing...' : '🚀 Complete Sale'}
                                    </button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Recent Sales */}
                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-600">
                        <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                            📊 Recent Sales
                        </h3>
                        <div className="space-y-2 text-sm">
                            {recentSales.slice(0, 3).map((sale) => (
                                <div
                                    key={sale.id}
                                    className="rounded bg-gray-50 p-2 dark:bg-gray-700"
                                >
                                    <div className="flex justify-between">
                                        <span className="text-gray-900 dark:text-white">
                                            ${parseFloat(sale.total).toFixed(2)}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {new Date(sale.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        {sale.items.length} items • {sale.user.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
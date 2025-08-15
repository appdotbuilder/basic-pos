import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string;
    stock: number;
    sku?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ShowProduct({ product }: Props) {
    const deleteProduct = () => {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            router.delete(route('products.destroy', product.id));
        }
    };

    return (
        <AppShell>
            <Head title={product.name} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📦 {product.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Product details and information
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('products.edit', product.id)}
                            className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                        >
                            ✏️ Edit Product
                        </Link>
                        <Link
                            href={route('products.index')}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Product Information */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                Product Information
                            </h2>
                            
                            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Product Name
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                        {product.name}
                                    </dd>
                                </div>

                                {product.sku && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            SKU
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {product.sku}
                                        </dd>
                                    </div>
                                )}

                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Price
                                    </dt>
                                    <dd className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Stock Quantity
                                    </dt>
                                    <dd className={`mt-1 text-lg font-semibold ${
                                        product.stock <= 5
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-gray-900 dark:text-white'
                                    }`}>
                                        {product.stock} units
                                        {product.stock <= 5 && (
                                            <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-800 dark:text-red-100">
                                                Low Stock
                                            </span>
                                        )}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Status
                                    </dt>
                                    <dd className="mt-1">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                            product.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                        }`}>
                                            {product.is_active ? '✅ Active' : '❌ Inactive'}
                                        </span>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Created
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </dd>
                                </div>
                            </dl>

                            {product.description && (
                                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Description
                                    </dt>
                                    <dd className="mt-2 text-gray-900 dark:text-white">
                                        {product.description}
                                    </dd>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions and Quick Stats */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('products.edit', product.id)}
                                    className="block w-full rounded-lg bg-orange-600 px-4 py-2 text-center font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                >
                                    ✏️ Edit Product
                                </Link>
                                <Link
                                    href={route('pos.index')}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    🏪 Add to Sale
                                </Link>
                                <button
                                    onClick={deleteProduct}
                                    className="block w-full rounded-lg border border-red-300 px-4 py-2 text-center text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                                >
                                    🗑️ Delete Product
                                </button>
                            </div>
                        </div>

                        {/* Product Stats */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Product Value
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Inventory Value:
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ${(parseFloat(product.price) * product.stock).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Units in Stock:
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {product.stock}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Unit Price:
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Sale {
    id: number;
    total: string;
    tax: string;
    payment_method: string;
    notes?: string;
    created_at: string;
    user: {
        name: string;
    };
    items: Array<{
        id: number;
        quantity: number;
        unit_price: string;
        total_price: string;
        product: {
            name: string;
            sku?: string;
        };
    }>;
}

interface Props {
    sales: {
        data: Sale[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function SalesIndex({ sales }: Props) {
    return (
        <AppShell>
            <Head title="Sales History" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📊 Sales History
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            View all completed transactions
                        </p>
                    </div>
                    <Link
                        href={route('pos.index')}
                        className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                        🏪 Back to POS
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Sale ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Cashier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {sales.data.map((sale) => (
                                    <tr key={sale.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            #{sale.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {new Date(sale.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {sale.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {sale.items.length} items
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {sale.items.slice(0, 2).map(item => item.product.name).join(', ')}
                                                {sale.items.length > 2 && '...'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                {sale.payment_method === 'cash' && '💵'}
                                                {sale.payment_method === 'credit_card' && '💳'}
                                                {sale.payment_method === 'debit_card' && '💳'}
                                                {' '}
                                                {sale.payment_method.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                            ${parseFloat(sale.total).toFixed(2)}
                                            {parseFloat(sale.tax) > 0 && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Tax: ${parseFloat(sale.tax).toFixed(2)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                href={route('sales.show', sale.id)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {sales.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {((sales.current_page - 1) * sales.per_page) + 1} to{' '}
                            {Math.min(sales.current_page * sales.per_page, sales.total)} of{' '}
                            {sales.total} results
                        </div>
                        <div className="flex space-x-1">
                            {sales.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                        link.active
                                            ? 'bg-orange-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="text-2xl">📈</div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${sales.data.reduce((sum, sale) => sum + parseFloat(sale.total), 0).toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Sales (This Page)
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="text-2xl">🛍️</div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {sales.data.reduce((sum, sale) => sum + sale.items.length, 0)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Items Sold
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="text-2xl">💳</div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {(sales.data.reduce((sum, sale) => sum + parseFloat(sale.total), 0) / sales.data.length || 0).toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Average Sale
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
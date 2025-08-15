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
        email: string;
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
    sale: Sale;
    [key: string]: unknown;
}

export default function SaleShow({ sale }: Props) {
    const subtotal = sale.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
    const tax = parseFloat(sale.tax);
    const total = parseFloat(sale.total);

    return (
        <AppShell>
            <Head title={`Sale #${sale.id}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🧾 Sale #{sale.id}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Transaction details and receipt
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.print()}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            🖨️ Print Receipt
                        </button>
                        <Link
                            href={route('sales.index')}
                            className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                        >
                            ← Back to Sales
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Sale Information */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Sale Information
                            </h2>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Sale ID
                                    </dt>
                                    <dd className="text-sm text-gray-900 dark:text-white">
                                        #{sale.id}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Date & Time
                                    </dt>
                                    <dd className="text-sm text-gray-900 dark:text-white">
                                        {new Date(sale.created_at).toLocaleString()}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Cashier
                                    </dt>
                                    <dd className="text-sm text-gray-900 dark:text-white">
                                        {sale.user.name}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Payment Method
                                    </dt>
                                    <dd className="text-sm text-gray-900 dark:text-white">
                                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                            {sale.payment_method === 'cash' && '💵'}
                                            {sale.payment_method === 'credit_card' && '💳'}
                                            {sale.payment_method === 'debit_card' && '💳'}
                                            {' '}
                                            {sale.payment_method.replace('_', ' ')}
                                        </span>
                                    </dd>
                                </div>
                                {sale.notes && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Notes
                                        </dt>
                                        <dd className="text-sm text-gray-900 dark:text-white">
                                            {sale.notes}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Sale Items and Receipt */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Receipt
                            </h2>
                            
                            {/* Items Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Item
                                            </th>
                                            <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Qty
                                            </th>
                                            <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Unit Price
                                            </th>
                                            <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {sale.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                    {item.product.name}
                                                    {item.product.sku && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            SKU: {item.product.sku}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white">
                                                    ${parseFloat(item.unit_price).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                                                    ${parseFloat(item.total_price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Totals */}
                            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                        <span className="text-gray-900 dark:text-white">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    {tax > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                                            <span className="text-gray-900 dark:text-white">
                                                ${tax.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold dark:border-gray-700">
                                        <span className="text-gray-900 dark:text-white">Total:</span>
                                        <span className="text-gray-900 dark:text-white">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <p>Thank you for your purchase!</p>
                                <p className="mt-1">
                                    Sale completed on {new Date(sale.created_at).toLocaleDateString()} at{' '}
                                    {new Date(sale.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
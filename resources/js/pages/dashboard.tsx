import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Welcome Section */}
                <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-r from-orange-50 to-red-50 p-8 dark:border-sidebar-border dark:from-orange-950/20 dark:to-red-950/20">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🏪 Point of Sale Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Welcome to your complete cashier solution. Manage products, process sales, and track your business performance.
                    </p>
                    <Link
                        href={route('pos.index')}
                        className="inline-flex items-center rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                        🚀 Open POS System
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href={route('pos.index')}
                        className="group rounded-xl border border-sidebar-border/70 bg-white p-6 transition-all hover:shadow-lg dark:border-sidebar-border dark:bg-gray-800 dark:hover:bg-gray-750"
                    >
                        <div className="flex items-center mb-4">
                            <div className="text-3xl mr-4">💳</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Process Sale
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Quick checkout and payment processing
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-orange-600 group-hover:text-orange-700 dark:text-orange-400">
                                Open POS →
                            </span>
                        </div>
                    </Link>

                    <Link
                        href={route('products.index')}
                        className="group rounded-xl border border-sidebar-border/70 bg-white p-6 transition-all hover:shadow-lg dark:border-sidebar-border dark:bg-gray-800 dark:hover:bg-gray-750"
                    >
                        <div className="flex items-center mb-4">
                            <div className="text-3xl mr-4">📦</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Manage Products
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add, edit, and track inventory
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-orange-600 group-hover:text-orange-700 dark:text-orange-400">
                                View Products →
                            </span>
                        </div>
                    </Link>

                    <Link
                        href={route('sales.index')}
                        className="group rounded-xl border border-sidebar-border/70 bg-white p-6 transition-all hover:shadow-lg dark:border-sidebar-border dark:bg-gray-800 dark:hover:bg-gray-750"
                    >
                        <div className="flex items-center mb-4">
                            <div className="text-3xl mr-4">📊</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Sales History
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    View transactions and reports
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-orange-600 group-hover:text-orange-700 dark:text-orange-400">
                                View Sales →
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Features Overview */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            🎯 Key Features
                        </h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                                Real-time inventory tracking
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                                Multiple payment method support
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                                Detailed sales reporting
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                                Low stock alerts
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                                Receipt printing support
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            📈 Getting Started
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Add Your Products</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Start by adding your inventory items with prices and stock levels</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Process Your First Sale</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Use the POS interface to scan or select items and complete transactions</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Track Performance</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitor sales history and inventory levels to optimize your business</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
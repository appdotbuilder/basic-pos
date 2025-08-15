import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('pos.index')}
                                    className="inline-block rounded-sm border border-[#f53003] bg-[#f53003] px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-[#e02a02] dark:border-[#FF4433] dark:bg-[#FF4433] dark:hover:bg-[#e03327]"
                                >
                                    Open POS 🏪
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row lg:gap-8">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-center shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="mb-8">
                                <h1 className="mb-4 text-4xl font-bold">🏪 Point of Sale System</h1>
                                <p className="mb-6 text-xl text-[#706f6c] dark:text-[#A1A09A]">
                                    Complete cashier solution for managing products and sales transactions
                                </p>
                            </div>

                            <div className="mb-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-lg bg-[#f8f8f7] p-4 dark:bg-[#1e1e1d]">
                                    <div className="mb-2 text-2xl">📦</div>
                                    <h3 className="mb-2 font-semibold">Product Management</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Add, update, and track product inventory with real-time stock levels
                                    </p>
                                </div>
                                <div className="rounded-lg bg-[#f8f8f7] p-4 dark:bg-[#1e1e1d]">
                                    <div className="mb-2 text-2xl">💳</div>
                                    <h3 className="mb-2 font-semibold">Sales Transactions</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Quick checkout with multiple payment methods and automatic calculations
                                    </p>
                                </div>
                                <div className="rounded-lg bg-[#f8f8f7] p-4 dark:bg-[#1e1e1d]">
                                    <div className="mb-2 text-2xl">📊</div>
                                    <h3 className="mb-2 font-semibold">Sales History</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Track all transactions with detailed reporting and analytics
                                    </p>
                                </div>
                            </div>

                            {auth.user ? (
                                <div className="space-y-4">
                                    <Link
                                        href={route('pos.index')}
                                        className="inline-block rounded-lg bg-[#f53003] px-8 py-3 text-lg font-semibold text-white hover:bg-[#e02a02] dark:bg-[#FF4433] dark:hover:bg-[#e03327]"
                                    >
                                        🚀 Start Selling
                                    </Link>
                                    <div className="flex justify-center gap-4 text-sm">
                                        <Link
                                            href={route('products.index')}
                                            className="text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            Manage Products
                                        </Link>
                                        <Link
                                            href={route('sales.index')}
                                            className="text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            View Sales History
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Ready to get started? Create your account or sign in to begin.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-[#f53003] px-6 py-2 font-semibold text-white hover:bg-[#e02a02] dark:bg-[#FF4433] dark:hover:bg-[#e03327]"
                                        >
                                            Get Started
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-lg border border-[#19140035] px-6 py-2 font-semibold text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <footer className="mt-12 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-[#f53003] hover:underline dark:text-[#FF4433]"
                                >
                                    app.build
                                </a>
                            </footer>
                        </div>
                        
                        {/* Mock POS Interface Preview */}
                        <div className="hidden lg:block lg:w-96">
                            <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-[#161615]">
                                <div className="mb-4 text-center">
                                    <h3 className="text-lg font-semibold">POS Interface Preview</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded bg-[#f8f8f7] p-3 text-sm dark:bg-[#1e1e1d]">
                                        <span>☕ Coffee</span>
                                        <span className="font-medium">$2.50</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded bg-[#f8f8f7] p-3 text-sm dark:bg-[#1e1e1d]">
                                        <span>🥪 Sandwich</span>
                                        <span className="font-medium">$5.99</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded bg-[#f8f8f7] p-3 text-sm dark:bg-[#1e1e1d]">
                                        <span>🥤 Soda</span>
                                        <span className="font-medium">$1.99</span>
                                    </div>
                                    <hr className="my-3 dark:border-[#3E3E3A]" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>$10.48</span>
                                    </div>
                                    <button className="w-full rounded bg-[#f53003] py-2 text-white dark:bg-[#FF4433]">
                                        Complete Sale
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
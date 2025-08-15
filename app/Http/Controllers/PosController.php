<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the main POS interface.
     */
    public function index()
    {
        $products = Product::active()->inStock()->get();
        $recentSales = Sale::with(['user', 'items.product'])
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('pos', [
            'products' => $products,
            'recentSales' => $recentSales
        ]);
    }
}
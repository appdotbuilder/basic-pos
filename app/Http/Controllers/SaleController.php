<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['user', 'items.product'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('sales/index', [
            'sales' => $sales
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::active()->inStock()->get();
        
        return Inertia::render('sales/create', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $validated = $request->validated();
            
            // Calculate totals
            $subtotal = 0;
            $saleItems = [];
            
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Check if enough stock
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Not enough stock for {$product->name}");
                }
                
                $totalPrice = $product->price * $item['quantity'];
                $subtotal += $totalPrice;
                
                $saleItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'total_price' => $totalPrice,
                ];
                
                // Reduce stock
                $product->decrement('stock', $item['quantity']);
            }
            
            $tax = $validated['tax'] ?? 0;
            $total = $subtotal + $tax;
            
            // Create sale
            $sale = Sale::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'tax' => $tax,
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'] ?? null,
            ]);
            
            // Create sale items
            foreach ($saleItems as $saleItem) {
                $sale->items()->create($saleItem);
            }
            
            return redirect()->route('sales.show', $sale)
                ->with('success', 'Sale completed successfully.');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load(['user', 'items.product']);
        
        return Inertia::render('sales/show', [
            'sale' => $sale
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        // Sales typically shouldn't be edited after completion
        abort(403, 'Sales cannot be edited after completion.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSaleRequest $request, Sale $sale)
    {
        // Sales typically shouldn't be edited after completion
        abort(403, 'Sales cannot be updated after completion.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        // Only allow deletion within a short timeframe or by admin
        abort(403, 'Sales cannot be deleted after completion.');
    }
}
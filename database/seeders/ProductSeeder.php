<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Coffee',
                'description' => 'Freshly brewed coffee',
                'price' => 2.50,
                'stock' => 50,
                'sku' => 'COF001',
                'is_active' => true,
            ],
            [
                'name' => 'Sandwich',
                'description' => 'Ham and cheese sandwich',
                'price' => 5.99,
                'stock' => 25,
                'sku' => 'SAN001',
                'is_active' => true,
            ],
            [
                'name' => 'Soda',
                'description' => 'Cold soft drink',
                'price' => 1.99,
                'stock' => 100,
                'sku' => 'SOD001',
                'is_active' => true,
            ],
            [
                'name' => 'Chips',
                'description' => 'Potato chips',
                'price' => 1.49,
                'stock' => 75,
                'sku' => 'CHI001',
                'is_active' => true,
            ],
            [
                'name' => 'Energy Bar',
                'description' => 'Nutritious energy bar',
                'price' => 2.99,
                'stock' => 30,
                'sku' => 'ENE001',
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Create additional random products
        Product::factory(15)->create();
    }
}
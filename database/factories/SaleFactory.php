<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total' => $this->faker->randomFloat(2, 5, 500),
            'tax' => $this->faker->randomFloat(2, 0, 25),
            'payment_method' => $this->faker->randomElement(['cash', 'credit_card', 'debit_card']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
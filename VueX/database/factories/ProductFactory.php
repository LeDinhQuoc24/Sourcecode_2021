<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => Str::random(10),
            'img' => Str::random(20),
            'price' => $this->faker->numberBetween($min=10000000,$max=99999999),
            'quantity'=>rand(10,100),
            'descreption' => Str::random(50),
        ];
    }
}

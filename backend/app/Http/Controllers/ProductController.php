<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return response()->json(Product::all());
    }

    // POST /api/products
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'product_name' => 'required|unique:products,product_name',
            'price' => 'required|numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Store image in storage/app/public/products
        $path = $request->file('image')->store('products', 'public');

        // Save product
        $product = Product::create([
            'product_name' => $validated['product_name'],
            'price' => $validated['price'],
            'image_path' => 'storage/' . $path, // e.g. storage/products/abc.jpg
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product added successfully',
            'product' => $product
        ], 201);
    }
}

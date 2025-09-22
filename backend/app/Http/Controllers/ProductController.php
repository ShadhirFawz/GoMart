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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Store image in storage/app/public/products
        // Handle image upload only if provided
        $imagePath = '';
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $path = $request->file('image')->store('products', 'public');
            $imagePath = 'storage/' . $path; // e.g. storage/products/abc.jpg
        }

        // Save product
        $product = Product::create([
            'product_name' => $validated['product_name'],
            'price' => $validated['price'],
            'image_path' => $imagePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product added successfully',
            'product' => $product
        ], 201);
    }
}

'use client';

import { useState } from "react";

export default function AddProductPage() {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#808080' },
    { name: 'Blue', color: '#0066FF' },
    { name: 'Red', color: '#FF0000' },
    { name: 'Green', color: '#00AA00' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'Pink', color: '#FF69B4' },
  ]
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className=" min-h-screen">

      <div className="bg-white border-b-2 border-[#ffe9cc] items-center justify-between mb-8">
        <div className="max-w-310 mx-auto py-10 flex justify-between items-center">
          <div className="">
            <h1 className="text-4xl font-bold mb-4">Products</h1>
            <p className="text-gray-600">Manage and add a new product to your store.</p>
          </div>
          <button className="bg-[#d19f42] text-xl text-white px-6 py-2 rounded-3xl font-semibold hover:bg-[#b8860b] transition-colors">
            <span className="text-2xl font-bold text-black">+ </span> Add Product
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-[#fffbf5]">
        {/* Form Card */}
        <div className="bg-white rounded-2xl border-2 border-[#ffe9cc] p-8">
          {/* Back Link */}
        <a href="#" className="text-[#d19f42] font-semibold text-sm mb-6 inline-block">
          ← Back to Products
        </a>

          <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

          <form className="space-y-8">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name</label>
              <input
                type="text"
                placeholder="E.g., Minimalist Gray Shirt"
                className="w-full bg-[#fffbf5] px-4 py-3 border-2 border-[#ffe9cc] rounded-lg placeholder-gray-400"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Price</label>
                <div className="flex items-center bg-[#fffbf5] px-4 h-12.5 border-2 border-[#ffe9cc] rounded-lg">
                  <span className=" font-semibold mr-2">$</span>
                  <input
                    type="number"
                    placeholder="49.99"
                    className="flex-1 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select className="w-full bg-[#fffbf5] px-4 h-12.5 border-2 border-[#ffe9cc] rounded-lg">
                  <option>Choose option...</option>
                  <option>TOP</option>
                  <option>BOTTOM</option>
                  <option>SHOES</option>
                  <option>HAT</option>
                  <option>GLASSES</option>
                  <option>ACCESSORY</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 bg-[#fffbf5] py-3 border-2 border-[#ffe9cc] rounded-lg placeholder-gray-400 resize-none"
              />
            </div>

            {/* 3D Model Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">3D Model (GLB/GLT)</label>
              <div className="w-full px-6 py-12 border-2 border-dashed border-[#ffe9cc] rounded-lg bg-[#fff9f3]">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 mx-auto mb-2 text-[#d19f42]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z" />
                  </svg>
                  <p className="text-sm font-semibold">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">GLB, GLTF (.glb)</p>
                </div>
              </div>
            </div>

            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Image</label>
              <div className="w-full px-6 py-12 border-2 border-dashed border-[#ffe9cc] rounded-lg bg-[#fff9f3]">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 mx-auto mb-2 text-[#d19f42]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z" />
                  </svg>
                  <p className="text-sm font-semibold">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG (Max 2MB)</p>
                </div>
              </div>
            </div>

            {/* Available Sizes */}
            <div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`w-full h-12 rounded-lg font-semibold border-2 transition-colors duration-200 ${selectedSizes.includes(size) ? 'bg-[#d19f42] text-white border-[#d19f42]' : 'border-[#ffe9cc] hover:bg-[#fff4e6]'}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Colors */}
            <div>
              <label className="block text-sm font-semibold mb-3">Available Colors</label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {colors.map(item => (
                  <button
                    key={item.color}
                    type="button"
                    className={`w-full h-12 sm:h-16 rounded-3xl border-2 flex justify-center items-center ${selectedColors.includes(item.color) ? 'border-[#d19f42] scale-110' : 'border-gray-300 hover:border-[#d19f42]'}`}
                    style={{ backgroundColor: item.color }}
                    title={item.color}
                    onClick={() => toggleColor(item.color)}
                  >
                    {selectedColors.includes(item.color) && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-6 h-6 ${['#FFFFFF', '#FFFF00'].includes(item.color) ? 'text-black' : 'text-white'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                className="flex-1 px-6 py-3 border-2 border-[#d19f42] text-[#d19f42] font-bold rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#d19f42] text-white font-bold rounded-full"
              >
                Publish Product
              </button>
            </div>

            {/* Tip */}
            <div className="pt-4 px-4 py-3 bg-[#fff9f3] border-l-4 border-[#d19f42] rounded">
              <p className="text-xs">
                <span className="font-semibold text-[#d19f42]">💡 Tip:</span> Use high-quality images and detailed descriptions to help customers choose your products.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Check, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductManagerProps {
  initialProducts: any[];
  categories: any[];
  brands: any[];
}

export default function ProductManager({ initialProducts, categories, brands }: ProductManagerProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQuantity, setStockQuantity] = useState('100');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && !categoryId) setCategoryId(categories[0].id.toString());
    if (brands.length > 0 && !brandId) setBrandId(brands[0].id.toString());
  }, [categories, brands]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setSku(`SKU-${Date.now().toString().slice(-6)}`);
    setStockQuantity('100');
    setShortDesc('');
    setDescription('');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setName(product.name || '');
    setPrice(product.price ? product.price.toString() : '');
    setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setSku(product.sku || '');
    setStockQuantity(product.stockQuantity !== undefined ? product.stockQuantity.toString() : '100');
    setCategoryId(product.categoryId ? product.categoryId.toString() : categories[0]?.id.toString() || '');
    setBrandId(product.brandId ? product.brandId.toString() : brands[0]?.id.toString() || '');
    setShortDesc(product.shortDesc || '');
    setDescription(product.description || '');
    setImageUrl(product.images?.[0]?.url || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !sku) return;

    try {
      setSaving(true);
      const body = {
        name,
        price,
        originalPrice,
        sku,
        stockQuantity,
        categoryId: categoryId || categories[0]?.id,
        brandId: brandId || brands[0]?.id,
        shortDesc,
        description,
        images: imageUrl ? [{ url: imageUrl, isPrimary: true }] : []
      };

      let res;
      if (editingProduct) {
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error('Save product error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const formatPrice = (p: any) => {
    return Number(p || 0).toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Sản Phẩm</h1>
          <p className="text-gray-400">Danh sách sản phẩm trong cơ sở dữ liệu SQL Server.</p>
        </div>
        <Button onClick={openAddModal} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          <Plus className="w-4 h-4" /> Thêm Sản Phẩm Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80 focus-within:border-movielegend-500/50 transition-colors">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên hoặc SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button onClick={fetchProducts} variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300 hover:text-white">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Sản Phẩm</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Danh Mục</th>
                <th className="px-6 py-4">Giá Bán</th>
                <th className="px-6 py-4">Tồn Kho</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    {product.images?.[0]?.url && (
                      <img src={product.images[0].url} alt="" className="w-10 h-10 object-cover rounded-lg bg-black shrink-0" />
                    )}
                    <span>{product.name}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-movielegend-500">{product.sku}</td>
                  <td className="px-6 py-4">{product.category?.name || 'Chưa phân loại'}</td>
                  <td className="px-6 py-4 text-white font-medium">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">{product.stockQuantity}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Tên sản phẩm *</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Mã SKU *</label>
                  <input 
                    type="text" 
                    required 
                    value={sku} 
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Giá bán (VNĐ) *</label>
                  <input 
                    type="number" 
                    required 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Giá gạch (VNĐ)</label>
                  <input 
                    type="number" 
                    value={originalPrice} 
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Số lượng tồn kho</label>
                  <input 
                    type="number" 
                    value={stockQuantity} 
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Danh mục</label>
                  <select 
                    value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Thương hiệu</label>
                  <select 
                    value={brandId} 
                    onChange={(e) => setBrandId(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">URL Hình ảnh</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Mô tả ngắn</label>
                <input 
                  type="text" 
                  value={shortDesc} 
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Mô tả chi tiết</label>
                <textarea 
                  rows={3} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} className="rounded-full text-xs font-bold bg-movielegend-500 text-black hover:bg-amber-400 flex items-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {editingProduct ? 'Cập Nhật' : 'Tạo Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

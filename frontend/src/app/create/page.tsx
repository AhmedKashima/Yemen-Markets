'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Check } from 'lucide-react';

export default function CreateAdPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cityId, setCityId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Data
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // Fetch Data
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) router.push('/login');

    // 1. Fetch Cities
    fetch('http://localhost:8000/api/v1/locations/')
      .then(res => res.json())
      .then(data => {
        const allCities = data.flatMap((gov: any) => gov.cities);
        setCities(allCities);
      });

    // 2. Fetch Categories (If API fails, fall back to manual list for now)
    // IMPORTANT: IDs must match your Database!
    setCategories([
      { id: 1, name: 'مركبات' },
      { id: 2, name: 'عقارات' },
      { id: 3, name: 'إلكترونيات' },
      { id: 4, name: 'وظائف' },
    ]);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('city', cityId);
    formData.append('category', categoryId);
    formData.append('currency', 'YER');
    formData.append('status', 'active');
    
    if (image) {
      formData.append('main_image', image);
    }

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://localhost:8000/api/v1/ads/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Server Error:", responseData);
        // Show the REAL error from the server
        alert(`فشل النشر: ${JSON.stringify(responseData)}`);
        return;
      }

      router.push('/');
      
    } catch (err) {
      alert('خطأ في الاتصال بالخادم');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Common Style for Inputs (Forces Black Text)
  const inputStyle = "w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">إضافة إعلان جديد</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الإعلان</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputStyle} 
              placeholder="مثال: تويوتا كورولا 2020 نظيف..."
              required
            />
          </div>

          {/* Category & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
              <select 
                className={inputStyle}
                onChange={e => setCategoryId(e.target.value)}
                required
              >
                <option value="">اختر القسم</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <select 
                className={inputStyle}
                onChange={e => setCityId(e.target.value)}
                required
              >
                <option value="">اختر المدينة</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ريال يمني)</label>
            <input 
              type="number" 
              value={price}
              onChange={e => setPrice(e.target.value)}
              className={inputStyle}
              placeholder="0"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التفاصيل</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={`${inputStyle} h-32`}
              placeholder="اكتب وصفاً كاملاً للسلعة..."
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative bg-white">
            <input 
              type="file" 
              onChange={e => setImage(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
            <div className="flex flex-col items-center">
              {image ? (
                <>
                  <Check className="text-green-500 mb-2" size={32} />
                  <span className="text-sm font-medium text-green-600">{image.name}</span>
                </>
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-sm text-gray-500">اضغط لرفع صورة</span>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-md transition disabled:opacity-50"
          >
            {loading ? 'جاري النشر...' : 'نشر الإعلان مجاناً'}
          </button>

        </form>
      </div>
    </div>
  );
}
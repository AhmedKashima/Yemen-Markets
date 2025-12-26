import { MapPin, Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

async function getAd(id: string) {
  const res = await fetch(`http://localhost:8000/api/v1/ads/${id}/`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

// TYPE UPDATE: params is now a Promise

export default async function AdDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. AWAIT PARAMS (Next.js 16 Requirement)
  const resolvedParams = await params;
  const ad = await getAd(resolvedParams.id);

  if (!ad) {
    return <div className="p-10 text-center">الإعلان غير موجود</div>;
  }

  // Handle Image URL
  // const imageUrl = ad.main_image 
  //   ? `http://localhost:8000${ad.main_image}` 
  //   : 'https://via.placeholder.com/800x600?text=No+Image';
    let imageUrl = 'https://via.placeholder.com/800x600?text=No+Image';
  
  if (ad.main_image) {
    // 1. If it's already a full link (starts with http), use it as is
    if (ad.main_image.startsWith('http')) {
        imageUrl = ad.main_image;
    } 
    // 2. If it's a relative path (starts with /media), add the server domain
    else {
        imageUrl = `http://localhost:8000${ad.main_image}`;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20" dir="rtl">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/">الرئيسية</Link> &gt; <span>{ad.category_detail?.name_ar}</span> &gt; <span className="text-gray-900">{ad.title}</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Right Column: Images & Description */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Main Image */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="relative aspect-video bg-black">
              <img 
                src={imageUrl} 
                alt={ad.title} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">التفاصيل</h2>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="text-gray-500">المدينة: <span className="text-gray-900 font-medium">{ad.city_detail?.name_ar}</span></div>
              <div className="text-gray-500">الحالة: <span className="text-gray-900 font-medium">{ad.condition === 'new' ? 'جديد' : 'مستعمل'}</span></div>
              <div className="text-gray-500">تاريخ النشر: <span className="text-gray-900 font-medium">{new Date(ad.created_at).toLocaleDateString('ar-YE')}</span></div>
            </div>
            
            <h3 className="font-bold text-lg mb-2 text-gray-900">الوصف</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {ad.description}
            </p>
          </div>

        </div>

        {/* Left Column: Price & Seller Info */}
        <div className="space-y-4">
          
          {/* Price Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-black text-gray-900 mb-2">
              {Number(ad.price).toLocaleString()} <span className="text-base font-normal text-gray-600">ريال يمني</span>
            </div>
            <h1 className="text-lg text-gray-800 leading-snug mb-4">{ad.title}</h1>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
              <MapPin size={16} />
              <span>{ad.city_detail?.name_ar}</span>
            </div>

            <button className="w-full bg-[#00AAFF] hover:bg-[#0099ee] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-3 transition">
              <Phone size={20} />
              <span>إظهار رقم الهاتف</span>
            </button>
            
            <button className="w-full bg-white border-2 border-[#00AAFF] text-[#00AAFF] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition">
              <MessageCircle size={20} />
              <span>مراسلة البائع</span>
            </button>
          </div>

          {/* Safety Warning */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-3 items-start">
            <AlertTriangle className="text-orange-500 shrink-0" size={24} />
            <div className="text-xs text-gray-600">
              <strong>نصيحة أمان:</strong> لا تقم بتحويل الأموال مسبقاً. قابل البائع في مكان عام وتفحص السلعة جيداً قبل الشراء.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
// import { getLocations } from '@/lib/api';
// import Header from '@/components/Header';
// import Categories from '@/components/Categories';
// import AdCard from '@/components/AdCard';

// // DUMMY DATA (Translated)
// const FAKE_ADS = [
//   { id: 1, title: 'تويوتا كورولا 2015 نظيف كرت', price: 3500000, location: "صنعاء", date: 'اليوم 14:00', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop' },
//   { id: 2, title: 'آيفون 14 برو ماكس 256 جيجا', price: 900000, location: "عدن", date: 'أمس', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop' },
//   { id: 3, title: 'شقة فاخرة في حدة', price: 150000, location: "صنعاء", date: 'اليوم 09:30', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
//   { id: 4, title: 'كمبيوتر ألعاب RTX 3060', price: 450000, location: "تعز", date: 'منذ يومين', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop' },
//   { id: 5, title: 'لاند كروزر 2022 VXR', price: 45000000, location: "حضرموت", date: 'الآن', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=800&auto=format&fit=crop' },
//   { id: 6, title: 'مولد كهرباء 5 كيلو كاتم', price: 200000, location: "صنعاء", date: 'منذ أسبوع', image: 'https://images.unsplash.com/photo-1495435229349-186150016052?q=80&w=800&auto=format&fit=crop' },
// ];

// export default async function Home() {
//   let locations = [];
//   try {
//     locations = await getLocations();
//   } catch (e) {
//     console.error("API Error", e);
//   }

//   return (
//     <div className="min-h-screen bg-white pb-20">
//       <Header locations={locations} />
//       <main className="max-w-[1280px] mx-auto px-4">
        
//         <Categories />

//         {/* Banner */}
//         <div className="w-full h-32 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl my-6 flex items-center px-8 text-white relative overflow-hidden shadow-lg">
//             <div className="z-10">
//                 <h2 className="text-3xl font-bold mb-2">بيع واشتري أي شيء، في أي مكان.</h2>
//                 <p className="opacity-90 text-lg">أكبر سوق إلكتروني في اليمن.</p>
//             </div>
//         </div>

//         {/* Recommendations */}
//         <div className="mt-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">توصيات لك</h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
//                 {FAKE_ADS.map((ad) => (
//                     <AdCard 
//                         key={ad.id}
//                         title={ad.title}
//                         price={ad.price}
//                         location={ad.location}
//                         date={ad.date}
//                         image={ad.image}
//                     />
//                 ))}
//             </div>
//         </div>

//       </main>
//     </div>
//   );
// }

import { getLocations } from '@/lib/api';
import Header from '@/components/Header';
import Categories from '@/components/Categories';
import AdCard from '@/components/AdCard';


async function getAds() {
  // We use no-store to make sure we always get the latest ads
  // const res = await fetch('http://localhost:8000/api/v1/ads/', { cache: 'no-store' });
  const res = await fetch('http://localhost:8000/api/v1/ads/', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const [locations, ads] = await Promise.all([
    getLocations(),
    getAds()
  ]);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header locations={locations} />
      <main className="max-w-[1280px] mx-auto px-4">
        
        <Categories />

        {/* Banner */}
        <div className="w-full h-32 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl my-6 flex items-center px-8 text-white relative overflow-hidden shadow-lg">
            <div className="z-10">
                <h2 className="text-3xl font-bold mb-2">بيع واشتري أي شيء، في أي مكان.</h2>
                <p className="opacity-90 text-lg">أكبر سوق إلكتروني في اليمن.</p>
            </div>
        </div>

        {/* Real Ads Grid */}
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">أحدث الإعلانات</h2>
            
            {ads.length === 0 ? (
                <div className="text-center py-10 text-gray-500">لا توجد إعلانات بعد. كن أول من ينشر!</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {ads.map((ad: any) => (
                        <AdCard 
                            key={ad.id}
                            id={ad.id}  // <--- THIS LINE IS CRITICAL. DO NOT DELETE IT.
                            title={ad.title}
                            price={ad.price}
                            location={ad.city_detail?.name_ar || 'اليمن'}
                            date={new Date(ad.created_at).toLocaleDateString('ar-YE')}
                            image={ad.main_image}
                        />
                    ))}
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
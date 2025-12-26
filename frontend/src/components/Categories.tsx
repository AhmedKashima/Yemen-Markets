import { Car, Home, Smartphone, Briefcase, Shirt, Armchair, Dog, Wrench } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'سيارات', icon: Car, color: 'bg-red-100 text-red-600' },
  { name: 'عقارات', icon: Home, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'إلكترونيات', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { name: 'وظائف', icon: Briefcase, color: 'bg-green-100 text-green-600' },
  { name: 'موضة', icon: Shirt, color: 'bg-purple-100 text-purple-600' },
  { name: 'أثاث', icon: Armchair, color: 'bg-orange-100 text-orange-600' },
  { name: 'حيوانات', icon: Dog, color: 'bg-pink-100 text-pink-600' },
  { name: 'خدمات', icon: Wrench, color: 'bg-gray-100 text-gray-600' },
];

export default function Categories() {
  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex gap-4 md:grid md:grid-cols-8 min-w-max md:min-w-0">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center gap-2 group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
              <cat.icon size={24} />
            </div>
            <span className="text-sm font-bold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ... داخل الماب (map):
{CATEGORIES.map((cat, index) => (
  <Link 
    key={cat.name} 
    href={`/?category=${index + 1}`} // نفترض أن الـ IDs تبدأ من 1
    className="flex flex-col items-center gap-2 group cursor-pointer"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.color} ...`}>
      <cat.icon size={24} />
    </div>
    <span className="text-sm font-bold text-gray-700">{cat.name}</span>
  </Link>
))}
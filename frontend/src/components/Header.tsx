'use client';

import { Search, MapPin, Menu, User, Heart, MessageCircle, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface City { id: number; name_en: string; name_ar: string; }
interface Governorate { id: number; name_en: string; name_ar: string; cities: City[]; }

export default function Header({ locations }: { locations: Governorate[] }) {
  const [selectedCity, setSelectedCity] = useState("صنعاء");
  const [isLocOpen, setIsLocOpen] = useState(false);
  
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/?search=${searchQuery}`);
    } else {
      router.push('/');
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-[#1e293b] text-white text-xs py-1 px-4 hidden md:block">
        <div className="max-w-[1280px] mx-auto flex justify-between">
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-200">للأعمال</a>
            <a href="#" className="hover:text-blue-200">وظائف</a>
            <a href="#" className="hover:text-blue-200">المساعدة</a>
          </div>
          <div className="flex gap-2">
             <span>العربية</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1280px] mx-auto py-3 px-4 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter ml-4">
          سوق<span className="text-red-500">اليمن</span>
        </Link>

        {/* 'All Categories' Button */}
        <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition ml-2">
          <Menu size={20} />
          <span>جميع الفئات</span>
        </button>

        {/* Search Bar Container */}
        <div className="flex-1 flex h-12 border-2 border-blue-600 rounded-md overflow-hidden">
            {/* Search Input */}
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="ابحث عن سيارات، عقارات، وظائف..." 
              className="flex-1 px-4 outline-none text-gray-700 text-right"
            />
    
            {/* Location Selector */}
            <div className="relative border-r border-gray-300 hidden sm:block">
                <button 
                  onClick={() => setIsLocOpen(!isLocOpen)}
                  className="h-full px-4 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium min-w-[140px] justify-between"
                >
                  <span className="truncate">{selectedCity}</span>
                  <MapPin size={16} className="text-gray-500" />
                </button>

                {/* Dropdown for Cities */}
                {isLocOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl border rounded-md p-2 max-h-80 overflow-y-auto z-50 text-right">
                    {locations.map(gov => (
                      <div key={gov.id} className="mb-2">
                        <div className="text-xs font-bold text-gray-400 px-2 py-1">{gov.name_ar}</div>
                        {gov.cities.map(city => (
                          <div 
                            key={city.id} 
                            onClick={() => { setSelectedCity(city.name_ar); setIsLocOpen(false); }}
                            className="px-2 py-1.5 hover:bg-blue-50 cursor-pointer text-sm rounded"
                          >
                            {city.name_ar}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 px-6 flex items-center justify-center text-white hover:bg-blue-700">
              <Search size={20} />
            </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-5 text-gray-600 mr-2">
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-blue-600 group">
                <Heart size={20} className="group-hover:scale-110 transition" />
                <span className="text-[11px] mt-1">المفضلة</span>
            </div>
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-blue-600 group">
                <MessageCircle size={20} className="group-hover:scale-110 transition" />
                <span className="text-[11px] mt-1">الرسائل</span>
            </div>
            
            {/* LOGIN LINK IS HERE */}
            <Link href="/login" className="hidden md:flex flex-col items-center cursor-pointer hover:text-blue-600 group">
                <User size={20} className="group-hover:scale-110 transition" />
                <span className="text-[11px] mt-1">دخول</span>
            </Link>

            {/* POST AD BUTTON IS HERE */}
            <Link href="/create">
                <button className="bg-[#00AAFF] text-white px-5 py-2 rounded-md font-bold text-sm shadow-md hover:bg-[#0099ee] flex items-center gap-2">
                  <PlusCircle size={18} />
                  <span>إعلانك</span>
                </button>
            </Link>
        </div>
      </div>
    </header>
  );
}
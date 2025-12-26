'use client'; // <--- THIS IS THE MAGIC LINE YOU MISSED

import Link from 'next/link';

interface AdProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  date: string;
}

export default function AdCard({ id, title, price, location, image, date }: AdProps) {
  // Logic to ensure URL is correct
  let finalImage = image;
  if (image && image.startsWith('/media')) {
    finalImage = `http://localhost:8000${image}`;
  } else if (!image) {
    finalImage = 'https://via.placeholder.com/300?text=No+Image';
  }

  return (
    <Link href={`/ad/${id}`}>
      <div className="bg-white rounded-lg cursor-pointer group hover:shadow-lg transition border border-transparent hover:border-gray-200 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
          <img 
            src={finalImage} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            // This event handler is why we need 'use client'
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300?text=Error';
            }} 
          />
        </div>

        {/* Info */}
        <div className="mt-3 p-2">
          <h3 className="text-gray-900 font-medium truncate group-hover:text-blue-600 text-base text-right">
            {title}
          </h3>
          <div className="font-bold text-lg mt-1 text-right text-gray-900">
              {Number(price).toLocaleString()} <span className="text-sm font-normal text-gray-500">ريال</span>
          </div>
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
              <span>{location}</span>
              <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}



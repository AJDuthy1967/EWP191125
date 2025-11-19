import React from 'react';
import { DailyOutfit } from '../types';
import { Sparkles, Atom } from 'lucide-react';

interface OutfitCardProps {
  outfit: DailyOutfit;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
  return (
    <div className="bg-stone-50 p-6 rounded-xl shadow-xl border-2 border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <Atom size={120} />
        </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-stone-900 serif-font tracking-wider border-b-2 border-stone-800 inline-block pb-1">
          {outfit.day === 'Friday' ? "Friday's Leftovers" : `${outfit.day}'s Costume`}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <ItemDisplay label="The Suit" image={outfit.suit.imageUrl} name={outfit.suit.name} />
        <ItemDisplay label="The Shirt" image={outfit.shirt.imageUrl} name={outfit.shirt.name} />
        <ItemDisplay label="The Tie" image={outfit.tie.imageUrl} name={outfit.tie.name} />
        <ItemDisplay label="The Shoes" image={outfit.shoes.imageUrl} name={outfit.shoes.name} />
      </div>

      {outfit.commentary && (
        <div className="mt-4 bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex items-start space-x-3">
            <Sparkles className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
            <p className="text-indigo-900 italic text-sm font-serif">
                "{outfit.commentary}"
            </p>
        </div>
      )}
    </div>
  );
};

const ItemDisplay: React.FC<{ label: string; image?: string; name: string }> = ({ label, image, name }) => (
  <div className="flex flex-col items-center p-2 bg-white rounded shadow-sm border border-stone-200">
    <span className="text-xs font-bold text-stone-500 uppercase mb-1 tracking-widest">{label}</span>
    <div className="w-20 h-20 mb-2 overflow-hidden rounded-md bg-stone-100">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-xs text-center font-medium text-stone-800 leading-tight">{name}</span>
  </div>
);
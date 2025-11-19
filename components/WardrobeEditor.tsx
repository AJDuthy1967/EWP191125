import React, { useState } from 'react';
import { Category, WardrobeItem } from '../types';
import { Upload, Edit2, Save, X } from 'lucide-react';

interface WardrobeEditorProps {
  category: Category;
  items: WardrobeItem[];
  onUpdateItem: (category: Category, index: number, newItem: WardrobeItem) => void;
}

export const WardrobeEditor: React.FC<WardrobeEditorProps> = ({ category, items, onUpdateItem }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');

  const startEditing = (index: number, currentName: string) => {
    setEditingIndex(index);
    setTempName(currentName);
  };

  const saveEdit = (index: number) => {
    if (editingIndex !== null) {
      onUpdateItem(category, index, { ...items[index], name: tempName });
      setEditingIndex(null);
    }
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateItem(category, index, { ...items[index], imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-stone-200">
      <h3 className="text-xl font-bold mb-4 text-stone-700 uppercase tracking-widest border-b border-stone-300 pb-2">{category}S</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center space-x-3 p-2 bg-stone-50 rounded hover:bg-stone-100 transition-colors">
            
            {/* Image Handling */}
            <div className="relative group w-12 h-12 flex-shrink-0">
               <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded border border-stone-300" 
              />
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer rounded transition-opacity">
                <Upload size={16} className="text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </label>
            </div>

            {/* Text Content */}
            <div className="flex-grow">
              {editingIndex === index ? (
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={tempName} 
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  />
                  <button onClick={() => saveEdit(index)} className="text-green-600"><Save size={16}/></button>
                  <button onClick={() => setEditingIndex(null)} className="text-red-500"><X size={16}/></button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-800 line-clamp-2">{index + 1}. {item.name}</span>
                  <button onClick={() => startEditing(index, item.name)} className="text-stone-400 hover:text-stone-600 ml-2">
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
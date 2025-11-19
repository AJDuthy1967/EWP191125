import React, { useState, useCallback, useEffect } from 'react';
import { DEFAULT_WARDROBE } from './constants';
import { WardrobeState, Category, WardrobeItem, DailyOutfit, DAYS } from './types';
import { WardrobeEditor } from './components/WardrobeEditor';
import { OutfitCard } from './components/OutfitCard';
import { getFashionCommentary } from './services/geminiService';
import { Atom, RotateCcw, Shirt } from 'lucide-react';

function App() {
  const [wardrobe, setWardrobe] = useState<WardrobeState>(DEFAULT_WARDROBE);
  const [schedule, setSchedule] = useState<DailyOutfit[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to get unused items for a category
  const getUnusedItems = useCallback((category: Category, usedIds: Set<string>) => {
    return wardrobe[category].filter(item => !usedIds.has(item.id));
  }, [wardrobe]);

  const handleUpdateItem = (category: Category, index: number, newItem: WardrobeItem) => {
    setWardrobe(prev => {
      const newList = [...prev[category]];
      newList[index] = newItem;
      return { ...prev, [category]: newList };
    });
  };

  const selectTodaysOutfit = async () => {
    if (currentDayIndex >= 5) return;

    setIsGenerating(true);

    // Gather IDs of items already used in the schedule
    const usedSuits = new Set(schedule.map(o => o.suit.id));
    const usedShirts = new Set(schedule.map(o => o.shirt.id));
    const usedTies = new Set(schedule.map(o => o.tie.id));
    const usedShoes = new Set(schedule.map(o => o.shoes.id));

    const availableSuits = getUnusedItems(Category.SUIT, usedSuits);
    const availableShirts = getUnusedItems(Category.SHIRT, usedShirts);
    const availableTies = getUnusedItems(Category.TIE, usedTies);
    const availableShoes = getUnusedItems(Category.SHOES, usedShoes);

    // Sanity check - should not happen with 5 items and 5 days
    if (availableSuits.length === 0 || availableShirts.length === 0 || availableTies.length === 0 || availableShoes.length === 0) {
        alert("Entropy error: Not enough clothes left!");
        setIsGenerating(false);
        return;
    }

    let suit, shirt, tie, shoes;

    // Logic: Pick Random 0-3, Pick Remaining for 4 (Friday)
    // Actually, picking a random index from 'available' works for both cases.
    // If it's Friday, 'available' has length 1, so random index is 0.
    
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    suit = pick(availableSuits);
    shirt = pick(availableShirts);
    tie = pick(availableTies);
    shoes = pick(availableShoes);

    // Generate AI Commentary
    const commentary = await getFashionCommentary(suit, shirt, tie, shoes);

    const newOutfit: DailyOutfit = {
      day: DAYS[currentDayIndex],
      suit,
      shirt,
      tie,
      shoes,
      commentary
    };

    setSchedule(prev => [...prev, newOutfit]);
    setCurrentDayIndex(prev => prev + 1);
    setIsGenerating(false);
  };

  const resetWeek = () => {
    setSchedule([]);
    setCurrentDayIndex(0);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-stone-900 text-stone-100 py-8 px-4 shadow-lg border-b-4 border-stone-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-stone-100 p-3 rounded-full">
                <Atom className="text-stone-900" size={40} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold serif-font tracking-widest">EINSTEIN'S WARDROBE</h1>
              <p className="text-stone-400 italic">Minimal Mental Effort. Maximum Sartorial Elegance.</p>
            </div>
          </div>
          {schedule.length > 0 && (
             <button 
                onClick={resetWeek}
                className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-stone-200 rounded transition-colors text-sm uppercase tracking-wider"
             >
               <RotateCcw size={16} /> Reset Week
             </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Wardrobe Management Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
             <Shirt className="text-stone-700" />
             <h2 className="text-2xl font-bold text-stone-800 serif-font">The Inventory</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WardrobeEditor category={Category.SUIT} items={wardrobe[Category.SUIT]} onUpdateItem={handleUpdateItem} />
            <WardrobeEditor category={Category.SHIRT} items={wardrobe[Category.SHIRT]} onUpdateItem={handleUpdateItem} />
            <WardrobeEditor category={Category.TIE} items={wardrobe[Category.TIE]} onUpdateItem={handleUpdateItem} />
            <WardrobeEditor category={Category.SHOES} items={wardrobe[Category.SHOES]} onUpdateItem={handleUpdateItem} />
          </div>
        </section>

        {/* Action Section */}
        <section className="mb-12 text-center">
            {currentDayIndex < 5 ? (
                <div className="max-w-md mx-auto">
                    <p className="mb-4 text-lg text-stone-600 italic font-serif">
                        Ready to dress for <span className="font-bold text-stone-900">{DAYS[currentDayIndex]}</span>?
                    </p>
                    <button
                        onClick={selectTodaysOutfit}
                        disabled={isGenerating}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-xl transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isGenerating ? (
                            <span className="animate-pulse">Calculating Probabilities...</span>
                        ) : (
                            <>
                                <Atom size={24} />
                                SELECT TODAY'S OUTFIT
                            </>
                        )}
                    </button>
                    <p className="mt-2 text-xs text-stone-500">
                        {currentDayIndex === 4 ? "(Automatically selects remaining items)" : "(Randomly selects from remaining inventory)"}
                    </p>
                </div>
            ) : (
                <div className="p-6 bg-stone-200 rounded-lg inline-block">
                    <h3 className="text-xl font-bold text-stone-700">The Week is Complete</h3>
                    <p className="text-stone-600">Return to your physics problems.</p>
                </div>
            )}
        </section>

        {/* Results Section */}
        <section>
            {schedule.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {schedule.map((outfit, idx) => (
                        <div key={outfit.day} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <OutfitCard outfit={outfit} />
                        </div>
                    ))}
                </div>
            )}
        </section>
      </main>

      <footer className="text-center py-8 text-stone-400 text-sm border-t border-stone-200 mt-12">
        <p>© 1925 Institute for Advanced Study (Simulated)</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
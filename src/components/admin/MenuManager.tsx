"use client";

import { useState } from "react";
import { UtensilsCrossed, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MenuManager({ initialCategories }: { initialCategories: any[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleAvailability = async (item: any) => {
    const nextState = !item.isAvailable;
    
    // Optimistic UI update
    setCategories(cats => cats.map(cat => ({
      ...cat,
      items: cat.items.map((i: any) => i.id === item.id ? { ...i, isAvailable: nextState } : i)
    })));

    try {
      await fetch("/api/admin/menu/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isAvailable: nextState })
      });
      router.refresh();
    } catch (e) {
      console.error(e);
      // Revert on error could go here
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setEditingItem({ ...editingItem, image: base64String });
    };
    reader.readAsDataURL(file);
  };

  const saveEdit = async () => {
    if (!editingItem) return;
    setLoading(true);
    try {
      await fetch("/api/admin/menu/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: editingItem.id, 
          image: editingItem.image,
          name: editingItem.name,
          description: editingItem.description,
          price: parseFloat(editingItem.price)
        })
      });
      
      setCategories(cats => cats.map(cat => ({
        ...cat,
        items: cat.items.map((i: any) => i.id === editingItem.id ? editingItem : i)
      })));
      setEditingItem(null);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {categories.map(category => (
          <div key={category.id} className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
            <h2 className="text-2xl font-display font-bold text-sindhu-terracotta mb-6 border-b border-sindhu-border/30 pb-4">
              {category.title}
            </h2>
            
            <div className="space-y-4">
              {category.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-sindhu-border/30">
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-sindhu-border/20 rounded-lg flex items-center justify-center shrink-0">
                        <UtensilsCrossed size={20} className="text-sindhu-text-light" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-sindhu-text">{item.name}</h3>
                      <p className="text-sm text-sindhu-text-light line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-sindhu-text">₹{item.price}</span>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={item.isAvailable} 
                          onChange={() => toggleAvailability(item)}
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${item.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${item.isAvailable ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                    </label>
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="text-sindhu-terracotta text-sm font-bold hover:underline"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-2xl font-display font-bold text-sindhu-text mb-6">Edit Item</h2>
            
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <label className="cursor-pointer group relative">
                  {editingItem.image ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-sm">
                      <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs tracking-widest">
                        CHANGE
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-sindhu-border rounded-xl flex flex-col items-center justify-center text-sindhu-text-light hover:border-sindhu-terracotta hover:text-sindhu-terracotta transition-colors">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-xs font-bold tracking-widest text-center">ADD IMAGE<br/>(Base64)</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div>
                <label className="text-xs tracking-widest text-sindhu-text-light mb-1 block">NAME</label>
                <input 
                  value={editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                  className="w-full border-b border-sindhu-border/50 py-2 focus:outline-none focus:border-sindhu-gold text-sindhu-text"
                />
              </div>
              
              <div>
                <label className="text-xs tracking-widest text-sindhu-text-light mb-1 block">DESCRIPTION</label>
                <textarea 
                  value={editingItem.description || ''} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full border-b border-sindhu-border/50 py-2 focus:outline-none focus:border-sindhu-gold text-sindhu-text resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-xs tracking-widest text-sindhu-text-light mb-1 block">PRICE (₹)</label>
                <input 
                  type="number"
                  value={editingItem.price} 
                  onChange={e => setEditingItem({...editingItem, price: e.target.value})}
                  className="w-full border-b border-sindhu-border/50 py-2 focus:outline-none focus:border-sindhu-gold text-sindhu-text"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 text-sindhu-text-light font-bold tracking-widest text-sm hover:bg-gray-50 rounded-xl transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 bg-sindhu-terracotta text-sindhu-charcoal py-3 rounded-xl font-bold tracking-widest text-sm disabled:opacity-50"
                >
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';
import React,{useState} from 'react';
import { generateFlashcards } from '../lib/api';
export default function FlashcardReview({ documentId }:{documentId:string }){
  const [topic,setTopic]=useState('');
  const [cards,setCards]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [index,setIndex]=useState(0);
  async function gen(){
    if(!topic.trim()) return;
    setLoading(true); setCards([]); setIndex(0);
    try{ const res = await generateFlashcards(documentId,topic,8); setCards(res.cards||[]); }catch(e){alert('err');}
    setLoading(false);
  }
  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <div className="flex gap-2 mb-3">
        <input className="border p-2 flex-1" value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="Topic" />
        <button onClick={gen} className="px-3 py-1 bg-emerald-700 text-white rounded">{loading?'Generating...':'Generate'}</button>
      </div>
      {cards.length>0 && (
        <div>
          <div className="p-4 border rounded mb-2">{cards[index].front}</div>
          <div className="text-xs mb-2">{cards[index].back}</div>
          <div className="flex gap-2">
            <button onClick={()=>setIndex((i)=> (i-1+cards.length)%cards.length)} className="px-2 py-1 border rounded">Prev</button>
            <button onClick={()=>setIndex((i)=> (i+1)%cards.length)} className="px-2 py-1 border rounded">Next</button>
          </div>
        </div>
      )}
    </section>
  );
}

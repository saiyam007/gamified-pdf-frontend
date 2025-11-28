'use client';
import React, { useState } from 'react';
import RagChat from '../../../components/RagChat';
import McqPractice from '../../../components/McqPractice';
import TopicSummarizer from '../../../components/TopicSummarizer';
import FlashcardReview from '../../../components/FlashcardReview';

export default function DocumentDetail({ params }: { params:{id:string} }){
  const [tab, setTab] = useState<'learn'|'practice'|'review'>('learn');
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-emerald-700">Study session</h2>
          <p className="text-xs text-slate-500">Doc ID: {params.id}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setTab('learn')} className={`px-3 py-1 rounded ${tab==='learn' ? 'bg-emerald-700 text-white':'bg-emerald-50'}`}>Learn</button>
          <button onClick={()=>setTab('practice')} className={`px-3 py-1 rounded ${tab==='practice' ? 'bg-emerald-700 text-white':'bg-emerald-50'}`}>Practice</button>
          <button onClick={()=>setTab('review')} className={`px-3 py-1 rounded ${tab==='review' ? 'bg-emerald-700 text-white':'bg-emerald-50'}`}>Review</button>
        </div>
      </div>

      {tab==='learn' && <RagChat documentId={params.id} />}
      {tab==='practice' && <McqPractice documentId={params.id} />}
      {tab==='review' && <FlashcardReview documentId={params.id} />}
    </div>
  );
}

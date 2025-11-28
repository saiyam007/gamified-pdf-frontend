'use client';
import React, { useState } from 'react';
import { askRag, getSummary } from '../lib/api';
export default function RagChat({ documentId }: { documentId: string }){
  const [q, setQ] = useState('');
  const [ans, setAns] = useState<any|null>(null);
  const [loading,setLoading]=useState(false);
  async function ask(){
    if(!q.trim()) return;
    setLoading(true); setAns(null);
    try{
      const res = await askRag(documentId,q);
      setAns(res);
    }catch(e:any){ alert('Error'); }
    setLoading(false);
  }
  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <label className="block text-xs mb-1">Ask about this PDF</label>
      <textarea className="w-full border p-2" rows={3} value={q} onChange={(e)=>setQ(e.target.value)} />
      <div className="mt-2 flex gap-2">
        <button onClick={ask} className="px-3 py-1 bg-emerald-700 text-white rounded">{loading?'Thinking...':'Ask'}</button>
      </div>

      {ans && (
        <div className="mt-3">
          <h4 className="font-semibold">Answer</h4>
          <p className="whitespace-pre-wrap">{ans.answer}</p>
          {ans.bullet_points && <ul className="list-disc pl-5 mt-2">{ans.bullet_points.map((b:any,i:number)=>(<li key={i}>{b}</li>))}</ul>}
        </div>
      )}
    </section>
  );
}

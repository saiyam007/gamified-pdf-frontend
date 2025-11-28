'use client';
import React, { useEffect, useState } from 'react';
import { generateMcq } from '../lib/api';
export default function McqPractice({ documentId }: { documentId: string }){
  const [topic,setTopic]=useState('');
  const [difficulty,setDifficulty]=useState<'easy'|'medium'|'hard'>('medium');
  const [questions,setQuestions]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);

  async function load(){
    setLoading(true); setQuestions([]);
    try{
      const res = await generateMcq(documentId,5,difficulty,topic||undefined);
      setQuestions(res.questions||[]);
    }catch(e:any){ alert('Error generating'); }
    setLoading(false);
  }

  useEffect(()=>{ void load(); }, []);

  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <div className="flex gap-2 items-end mb-3">
        <input className="border p-2 flex-1" placeholder="Topic (optional)" value={topic} onChange={(e)=>setTopic(e.target.value)} />
        <select className="border p-2" value={difficulty} onChange={(e)=>setDifficulty(e.target.value as any)}>
          <option value="easy">easy</option><option value="medium">medium</option><option value="hard">hard</option>
        </select>
        <button onClick={load} className="px-3 py-1 bg-emerald-700 text-white rounded">{loading?'Generating...':'Generate'}</button>
      </div>

      {questions.length===0 ? <p className="text-sm text-slate-500">No questions yet.</p> :
        <ol className="space-y-3">
          {questions.map((q,i)=>(
            <li key={i} className="p-2 border rounded">
              <div className="font-semibold">{q.question}</div>
              <ul className="mt-2 list-disc pl-5">{q.options.map((o:any,idx:number)=>(<li key={idx}>{o.label}. {o.text}</li>))}</ul>
              <div className="text-xs mt-2 text-slate-600">Answer: {q.correct_label}</div>
            </li>
          ))}
        </ol>
      }
    </section>
  );
}

'use client';
import React,{useState} from 'react';
import { getSummary, generateAudioSummary } from '../lib/api';
export default function TopicSummarizer({ documentId }:{documentId:string }){
  const [topic,setTopic]=useState('');
  const [summary,setSummary]=useState<any|null>(null);
  const [loading,setLoading]=useState(false);
  const [audio,setAudio]=useState<string|null>(null);

  async function summarize(){
    if(!topic.trim()) return;
    setLoading(true); setSummary(null); setAudio(null);
    try{ const res = await getSummary(documentId,topic); setSummary(res); }catch(e){alert('err');}
    setLoading(false);
  }

  async function audioGen(){
    setLoading(true);
    try{ const res = await generateAudioSummary(documentId,topic); setAudio(res.audio_path); }catch(e){alert('err');}
    setLoading(false);
  }

  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <input className="w-full border p-2 mb-2" placeholder="Topic to summarize" value={topic} onChange={(e)=>setTopic(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={summarize} className="px-3 py-1 bg-emerald-700 text-white rounded">Summarize</button>
        <button onClick={audioGen} className="px-3 py-1 border rounded">Generate audio</button>
      </div>
      {summary && <div className="mt-3"><p>{summary.answer}</p></div>}
      {audio && <div className="mt-2 text-xs">Audio path: {audio}</div>}
    </section>
  );
}

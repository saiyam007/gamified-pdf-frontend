'use client';
import React, { useEffect, useState } from 'react';
import { listDocuments, uploadPdf } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
  const [docs, setDocs] = useState<{id:string,name:string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  async function refresh(){
    try{
      const d = await listDocuments();
      setDocs(d);
    }catch(e:any){
      setError(e?.message||'Failed');
    }
  }

  useEffect(()=>{ void refresh(); }, []);

  async function onUpload(e:React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if(!file) return;
    setUploading(true);
    setError(null);
    try{
      await uploadPdf(file);
      await refresh();
    }catch(err:any){
      setError(err?.message||'Upload failed');
    }finally{ setUploading(false); }
  }

  return (
    <div className="space-y-4">
      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-semibold text-emerald-700">Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={onUpload} />
        {uploading && <p className="text-xs text-slate-500">Uploading & indexing…</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </section>

      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-semibold text-emerald-700">Your documents</h2>
        {docs.length===0 ? <p className="text-sm text-slate-500">No documents yet.</p> :
          <ul className="space-y-2">
            {docs.map(d=> (
              <li key={d.id}>
                <button className="text-emerald-700" onClick={()=>router.push(`/documents/${d.id}`)}>{d.name}</button>
              </li>
            ))}
          </ul>
        }
      </section>
    </div>
  );
}

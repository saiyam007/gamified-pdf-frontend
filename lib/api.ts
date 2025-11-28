import axios from 'axios';
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jainsaiyam71-gamified-pdf-backend.hf.space/api/v1';

export async function listDocuments(){
  const r = await axios.get(`${BASE}/documents`);
  return r.data;
}

export async function uploadPdf(file: File){
  const fd = new FormData();
  fd.append('file', file);
  const r = await axios.post(`${BASE}/documents/upload`, fd, { headers: {'Content-Type':'multipart/form-data'}});
  return r.data;
}

export async function askRag(documentId:string, question:string){
  const r = await axios.post(`${BASE}/rag/query`, { document_id: documentId, question });
  return r.data;
}

export async function getSummary(documentId:string, topic:string){
  const r = await axios.post(`${BASE}/rag/summary`, { document_id: documentId, topic });
  return r.data;
}

export async function generateMcq(documentId:string, num=5, difficulty='medium', topic?:string){
  const payload:any = { document_id: documentId, num_questions: num, difficulty };
  if(topic) payload.topic = topic;
  const r = await axios.post(`${BASE}/mcq/generate`, payload);
  return r.data;
}

export async function generateFlashcards(documentId:string, topic:string, num=8){
  const r = await axios.post(`${BASE}/flashcards/generate`, { document_id: documentId, topic, num_cards: num });
  return r.data;
}

export async function generateAudioSummary(documentId:string, topic:string){
  const r = await axios.post(`${BASE}/audio/summary`, { document_id: documentId, topic });
  return r.data;
}

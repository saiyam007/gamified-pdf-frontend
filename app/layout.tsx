import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Gamified PDF Tutor',
  description: 'Upload PDFs, ask questions, practice MCQs, and learn.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-4xl mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-emerald-700">StudyQuest</h1>
            <p className="text-sm text-slate-600">Upload a PDF and start learning.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

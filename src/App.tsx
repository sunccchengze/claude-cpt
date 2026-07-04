import { Navbar } from './components/Navbar';
import { ProgressTrack } from './components/ProgressTrack';
import { Glossary } from './components/Glossary';
import { TermCardPopup } from './components/TermCard';
import { PageContainer } from './components/PageContainer';
import { AutoKeywordHighlighter } from './components/AutoKeywordHighlighter';

// Split prologue
import { PrologueTitle } from './sections/splits/PrologueTitle';
import { PrologueModels } from './sections/splits/PrologueModels';
import { PrologueQuestion } from './sections/splits/PrologueQuestion';

// Chapter 1
import { Chapter1 } from './sections/Chapter1';

// Chapter 2 steps
import { Chapter2Intro } from './sections/Chapter2Intro';
import { Step1Tokenization } from './sections/Step1Tokenization';
import { Step2Embedding } from './sections/Step2Embedding';
import { Step2_5PositionalEncoding } from './sections/Step2_5PositionalEncoding';
import { Step3SelfAttention } from './sections/Step3SelfAttention';
import { Step4FFN } from './sections/Step4FFN';
import { Step5Stacking } from './sections/Step5Stacking';
import { Step6Output } from './sections/Step6Output';
import { Chapter2Summary } from './sections/Chapter2Summary';

// Split Chapter 3
import { Ch3Intro } from './sections/splits/Ch3Intro';
import { Ch3PreTraining } from './sections/splits/Ch3PreTraining';
import { Ch3InstructionTuning } from './sections/splits/Ch3InstructionTuning';
import { Ch3RLHF } from './sections/splits/Ch3RLHF';
import { Ch3Summary } from './sections/splits/Ch3Summary';

// Chapters 4-6 + Finale
import { Chapter4Comparison } from './sections/Chapter4Comparison';
import { Chapter5Emergence } from './sections/Chapter5Emergence';
import { Chapter6Boundaries } from './sections/Chapter6Boundaries';
import { Finale } from './sections/Finale';

const pages = [
  // Prologue — 3 pages
  <div key="p0"><PrologueTitle /></div>,
  <div key="p1"><PrologueModels /></div>,
  <div key="p2"><PrologueQuestion /></div>,

  // Chapter 1 — 1 page
  <div key="p3"><Chapter1 /></div>,

  // Chapter 2 — 9 pages (one per step + intro + summary)
  <div key="p4"><Chapter2Intro /></div>,
  <div key="p5"><Step1Tokenization /></div>,
  <div key="p6"><Step2Embedding /></div>,
  <div key="p7"><Step2_5PositionalEncoding /></div>,
  <div key="p8"><Step3SelfAttention /></div>,
  <div key="p9"><Step4FFN /></div>,
  <div key="p10"><Step5Stacking /></div>,
  <div key="p11"><Step6Output /></div>,
  <div key="p12"><Chapter2Summary /></div>,

  // Chapter 3 — 5 pages
  <div key="p13"><Ch3Intro /></div>,
  <div key="p14"><Ch3PreTraining /></div>,
  <div key="p15"><Ch3InstructionTuning /></div>,
  <div key="p16"><Ch3RLHF /></div>,
  <div key="p17"><Ch3Summary /></div>,

  // Chapters 4-6 + Finale — 4 pages
  <div key="p18"><Chapter4Comparison /></div>,
  <div key="p19"><Chapter5Emergence /></div>,
  <div key="p20"><Chapter6Boundaries /></div>,
  <div key="p21">
    <Finale />
    <footer className="bg-[#141413] text-white/60 py-8 px-4 text-center text-xs">
      <p className="font-[Poppins]">AI大模型工作原理 · 交互式科普</p>
      <p className="mt-2 text-white/40">本页面仅用于教育目的。所有动画和类比均为简化演示。</p>
    </footer>
  </div>,
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] overflow-hidden">
      {/* Fixed watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(80px, 12vw, 180px)', fontWeight: 400, fontStyle: 'italic', color: '#F0EEE8', letterSpacing: '0.06em', whiteSpace: 'nowrap', userSelect: 'none' }}>
          Sun Chengze
        </span>
      </div>

      <AutoKeywordHighlighter />
      <Navbar />
      <ProgressTrack />
      <Glossary />
      <TermCardPopup />

      <div className="relative z-[1] pt-12">
        <PageContainer pages={pages} />
      </div>
    </div>
  );
}

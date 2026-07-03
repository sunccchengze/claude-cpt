import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProgressTrack } from './components/ProgressTrack';
import { Glossary } from './components/Glossary';
import { TermCardPopup } from './components/TermCard';
import { BuildingNav } from './components/BuildingNav';
import { FlowConnector } from './components/FlowConnector';
import { Prologue } from './sections/Prologue';
import { Chapter1 } from './sections/Chapter1';
import { Chapter2Intro } from './sections/Chapter2Intro';
import { Step1Tokenization } from './sections/Step1Tokenization';
import { Step2Embedding } from './sections/Step2Embedding';
import { Step2_5PositionalEncoding } from './sections/Step2_5PositionalEncoding';
import { Step3SelfAttention } from './sections/Step3SelfAttention';
import { Step4FFN } from './sections/Step4FFN';
import { Step5Stacking } from './sections/Step5Stacking';
import { Step6Output } from './sections/Step6Output';
import { Chapter2Summary } from './sections/Chapter2Summary';
import { Chapter3Training } from './sections/Chapter3Training';
import { Chapter4Comparison } from './sections/Chapter4Comparison';
import { Chapter5Emergence } from './sections/Chapter5Emergence';
import { Chapter6Boundaries } from './sections/Chapter6Boundaries';
import { Finale } from './sections/Finale';
import { useStore } from './store';

export default function App() {
  const currentChapter = useStore(s => s.currentChapter);
  const [showBuildingNav, setShowBuildingNav] = useState(false);

  // Show building nav when in chapter 2
  useEffect(() => {
    setShowBuildingNav(currentChapter === 2);
  }, [currentChapter]);

  // Determine current step based on scroll position
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const ids = ['term-tokenization', 'term-embedding', 'term-positional-encoding', 'term-self-attention', 'term-ffn', 'term-transformer-layer', 'term-next-token-prediction'];
      let step = 0;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.6) {
            step = i;
            break;
          }
        }
      }
      setCurrentStep(step);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <Navbar />
      <ProgressTrack />
      <Glossary />
      <TermCardPopup />
      {showBuildingNav && <BuildingNav currentStep={currentStep} />}

      <main className="pt-12">
        {/* Prologue */}
        <Prologue />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 1: Transformer Architecture */}
        <Chapter1 />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 2: Step by Step Processing */}
        <Chapter2Intro />

        <Step1Tokenization />
        <FlowConnector />

        <Step2Embedding />
        <FlowConnector />

        <Step2_5PositionalEncoding />
        <FlowConnector />

        <Step3SelfAttention />
        <FlowConnector />

        <Step4FFN />
        <FlowConnector />

        <Step5Stacking />
        <FlowConnector />

        <Step6Output />

        <Chapter2Summary />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 3: Training */}
        <Chapter3Training />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 4: Claude vs GPT */}
        <Chapter4Comparison />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 5: Emergence */}
        <Chapter5Emergence />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Chapter 6: Boundaries */}
        <Chapter6Boundaries />

        <div className="w-16 h-px bg-[#B1ADA1]/30 mx-auto" />

        {/* Finale */}
        <Finale />
      </main>

      {/* Footer */}
      <footer className="bg-[#141413] text-white/60 py-8 px-4 text-center text-xs">
        <p className="font-[Poppins]">AI大模型工作原理 · 交互式科普</p>
        <p className="mt-2 text-white/40">
          本页面仅用于教育目的。所有动画和类比均为简化演示。
        </p>
      </footer>
    </div>
  );
}

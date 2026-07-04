import { useStore } from '../store';

const LOGO_LINKS = {
  claude: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
  gpt: 'https://openai.com/zh-Hans-CN/index/previewing-gpt-5-6-sol/',
};

// Logo component that uses actual image files with clickable links
export function LogoImage({ 
  type, 
  size, 
  showLabel = false 
}: { 
  type: 'claude' | 'gpt'; 
  size: number; 
  showLabel?: boolean;
}) {
  const src = type === 'claude' ? '/CLAUDE-LOGO.png' : '/GPT-LOGO.png';
  const link = type === 'claude' ? LOGO_LINKS.claude : LOGO_LINKS.gpt;
  const label = type === 'claude' ? 'Claude Fable 5' : 'GPT-5.6 Sol';
  const borderColor = type === 'claude' ? '#6A9BCC' : '#788C5D';

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col items-center group"
      title={label}
    >
      <div
        className="rounded-lg overflow-hidden transition-transform group-hover:scale-105"
        style={{
          width: size,
          height: size,
          border: `2px solid ${borderColor}40`,
        }}
      >
        <img
          src={src}
          alt={label}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#F0EDE8' }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] text-[#B1ADA1] mt-1 group-hover:text-[#141413] transition-colors">
          {label}
        </span>
      )}
    </a>
  );
}

export function Navbar() {
  const soundEnabled = useStore(s => s.soundEnabled);
  const toggleSound = useStore(s => s.toggleSound);
  const toggleGlossary = useStore(s => s.toggleGlossary);

  const setCurrentPage = useStore(s => s.setCurrentPage);

  const scrollToTop = () => {
    setCurrentPage(0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FAF9F5]/80 border-b border-[#B1ADA1]/20">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          className="font-[Poppins] text-sm font-semibold text-[#141413] hover:text-[#D97757] transition-colors cursor-pointer"
        >
          AI大模型工作原理
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <LogoImage type="claude" size={28} />
            <LogoImage type="gpt" size={28} />
          </div>
          <button
            onClick={toggleSound}
            className="text-lg hover:scale-110 transition-transform cursor-pointer"
            title={soundEnabled ? '关闭音效' : '开启音效'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={toggleGlossary}
            className="text-lg hover:scale-110 transition-transform cursor-pointer"
            title="术语词典"
          >
            📖
          </button>
        </div>
      </div>
    </nav>
  );
}

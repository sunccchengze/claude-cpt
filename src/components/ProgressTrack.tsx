import { useStore } from '../store';

const chapters = ['序幕', '第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '尾声'];

export function ProgressTrack() {
  const currentChapter = useStore(s => s.currentChapter);

  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(`chapter-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {chapters.map((name, idx) => (
        <button
          key={idx}
          onClick={() => scrollToChapter(idx)}
          className="group relative flex items-center cursor-pointer"
          title={name}
        >
          <span className="absolute right-6 bg-[#141413] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {name}
          </span>
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                idx === currentChapter
                  ? '#D97757'
                  : idx < currentChapter
                  ? '#141413'
                  : 'transparent',
              border:
                idx > currentChapter
                  ? '2px solid #B1ADA1'
                  : idx === currentChapter
                  ? '2px solid #D97757'
                  : '2px solid #141413',
              boxShadow: idx === currentChapter ? '0 0 8px rgba(217,119,87,0.5)' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  );
}

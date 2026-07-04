import { useStore, PAGE_LABELS, TOTAL_PAGES } from '../store';

export function ProgressTrack() {
  const currentPage = useStore(s => s.currentPage);
  const setCurrentPage = useStore(s => s.setCurrentPage);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5">
      {PAGE_LABELS.map((name, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(idx)}
          className="group relative flex items-center cursor-pointer"
          title={name}
        >
          <span className="absolute right-7 bg-[#141413] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {name}
          </span>
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                idx === currentPage
                  ? '#D97757'
                  : idx < currentPage
                  ? '#141413'
                  : 'transparent',
              border:
                idx > currentPage
                  ? '1.5px solid #B1ADA1'
                  : idx === currentPage
                  ? '1.5px solid #D97757'
                  : '1.5px solid #141413',
              boxShadow: idx === currentPage ? '0 0 8px rgba(217,119,87,0.5)' : 'none',
              transform: idx === currentPage ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        </button>
      ))}

      {/* Page counter */}
      <div className="text-center mt-2">
        <span className="text-[9px] text-[#B1ADA1] font-mono">
          {currentPage + 1}/{TOTAL_PAGES}
        </span>
      </div>
    </div>
  );
}

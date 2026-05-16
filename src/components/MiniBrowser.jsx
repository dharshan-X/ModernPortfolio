import { X } from 'lucide-react';

export default function MiniBrowser({ url = "https://dharsahan.github.io", onClose }) {
  return (
    <div className="w-full aspect-[3/4] max-h-[80vh] border border-black/10 rounded-2xl bg-white overflow-hidden shadow-2xl flex flex-col group relative animate-in fade-in zoom-in-95 duration-300">
      {/* Browser Header / macOS Window Controls */}
      <div className="h-10 bg-[#f6f6f6] border-b border-black/5 flex items-center px-4 gap-4 shrink-0">
        <div className="flex gap-2 group/controls hover:opacity-100 cursor-pointer" onClick={onClose}>
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center relative overflow-hidden transition-colors">
              <X size={8} strokeWidth={3} className="text-black/60 opacity-0 group-hover/controls:opacity-100 absolute" />
          </div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 px-4 hidden md:block">
          <div className="bg-white/80 rounded-md text-[10px] font-medium text-center text-text-muted py-1 border border-black/5 truncate max-w-[200px] mx-auto shadow-sm">
            {url.replace(/^https?:\/\//, '')}
          </div>
        </div>
        
        <div className="w-10 md:hidden"></div> {/* Spacer for mobile balance */}
      </div>
      
      {/* Browser Content */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Mini Browser View"
          loading="lazy"
        />
        {/* Subtle overlay that disappears on hover to prevent iframe from trapping the page's scroll prematurely */}
        <div className="absolute inset-0 bg-black/0 group-hover:pointer-events-none transition-all duration-300 pointer-events-auto flex items-center justify-center">
            <div className="bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-0 transition-opacity uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0">
                Click to interact
            </div>
        </div>
      </div>
    </div>
  );
}

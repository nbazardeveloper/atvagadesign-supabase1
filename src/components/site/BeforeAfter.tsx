import { useRef, useState } from "react";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] overflow-hidden border border-border select-none touch-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && setFromClientX(e.clientX)}
      onMouseDown={(e) => setFromClientX(e.clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* Before */}
      <div className="absolute inset-0 bg-[oklch(0.86_0.008_75)]">
        <img
          src="/images/before-after/befor.webp"
          alt="Wall before Venetian plaster finish"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/70 px-3 py-1.5">Before</span>
      </div>
      {/* After */}
      <div
        className="absolute inset-0 marble-bg"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src="/images/before-after/after.webp"
          alt="Wall after Venetian plaster finish"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.3em] text-background bg-foreground/80 px-3 py-1.5">After</span>
      </div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-px bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }} />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border border-foreground/20 flex items-center justify-center shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <span className="text-foreground text-lg tracking-tighter">‹›</span>
      </div>
    </div>
  );
}

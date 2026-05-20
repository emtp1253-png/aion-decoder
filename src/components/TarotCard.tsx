// src/components/TarotCard.tsx
import { useState, useEffect } from "react";

export interface CardData {
  id: number;
  name: string;
  num: string;
  sym: string;
  clr: string;
  keywords: string[];
}

interface TarotCardProps {
  card: CardData;
  position: string;
  reversed: boolean;
  revealed: boolean;
  onReveal?: () => void;
  autoRevealDelay?: number | null;
}

function SacredBackPattern() {
  return (
    <svg viewBox="0 0 120 120" className="t-card-back-svg" aria-hidden>
      <defs>
        <radialGradient id="back-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="120" height="120" fill="url(#back-radial)" />
      <g fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.55">
        <circle cx="60" cy="60" r="48" />
        <circle cx="60" cy="60" r="36" />
        <circle cx="60" cy="60" r="24" />
      </g>
      <g stroke="#d4af37" strokeWidth="0.25" opacity="0.4">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = 60 + Math.cos(a) * 24;
          const y1 = 60 + Math.sin(a) * 24;
          const x2 = 60 + Math.cos(a) * 54;
          const y2 = 60 + Math.sin(a) * 54;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.85">
        <polygon points="60,22 93,80 27,80" />
        <polygon points="60,98 27,40 93,40" />
      </g>
      <polygon points="60,38 78,49 78,71 60,82 42,71 42,49" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.55" />
      <text x="60" y="68" textAnchor="middle" fill="#d4af37" fontFamily="serif" fontSize="16" opacity="0.95">✦</text>
    </svg>
  );
}

export function TarotCard({ card, position, reversed, revealed, onReveal, autoRevealDelay }: TarotCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!revealed) { setFlipped(false); return; }
    if (autoRevealDelay != null) {
      const t = setTimeout(() => setFlipped(true), autoRevealDelay);
      return () => clearTimeout(t);
    }
    setFlipped(true);
  }, [revealed, autoRevealDelay]);

  return (
    <div className="t-card-wrap">
      <div className="t-card-position">{position}</div>
      <div
        className={`t-card ${flipped ? "is-flipped" : ""} ${flipped && reversed ? "is-reversed" : ""}`}
        onClick={() => !revealed && onReveal?.()}
        style={{ "--card-accent": card.clr } as React.CSSProperties}
        role="button"
        tabIndex={0}
      >
        <div className="t-card-inner">
          <div className="t-card-face t-card-back">
            <SacredBackPattern />
            <div className="t-card-back-frame" />
          </div>
          <div className="t-card-face t-card-front">
            <div className="t-card-front-frame">
              <div className="t-card-roman">{card.num}</div>
              <div className="t-card-sym-wrap">
                <div className="t-card-sym" style={{ color: card.clr, textShadow: `0 0 36px ${card.clr}, 0 0 12px ${card.clr}` }}>
                  {card.sym}
                </div>
              </div>
              <div className="t-card-divider" />
              <div className="t-card-name">{card.name}</div>
              <div className="t-card-kw">{card.keywords.slice(0, 2).join(" · ")}</div>
              {reversed && (
                <div className="t-card-rev-badge"><span>⟳</span><span>Invertida</span></div>
              )}
              <span className="t-card-corner tl">✦</span>
              <span className="t-card-corner tr">✦</span>
              <span className="t-card-corner bl">✦</span>
              <span className="t-card-corner br">✦</span>
            </div>
          </div>
        </div>
      </div>
      <div className="t-card-meta">
        {flipped ? (
          <>
            <div className="t-card-meta-name">{card.name}{reversed ? " · invertida" : ""}</div>
            <div className="t-card-meta-kw" style={{ color: card.clr }}>{card.keywords.join(" · ")}</div>
          </>
        ) : (
          <div className="t-card-meta-hint">✦</div>
        )}
      </div>
    </div>
  );
}

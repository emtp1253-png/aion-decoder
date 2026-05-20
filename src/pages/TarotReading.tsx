// src/pages/TarotReading.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TarotCard, type CardData } from "../components/TarotCard";
import "../tarot.css";

const MAJOR_ARCANA: CardData[] = [
  { id: 0,  name: "El Loco",         num: "O",     sym: "✧", clr: "#7B9FD4", keywords: ["Inicio", "Libertad", "Salto al vacío"] },
  { id: 1,  name: "El Mago",         num: "I",     sym: "⊕", clr: "#D4A76A", keywords: ["Voluntad", "Manifestación", "Poder"] },
  { id: 2,  name: "La Sacerdotisa",  num: "II",    sym: "☽", clr: "#9B7EC8", keywords: ["Intuición", "Misterio", "Sabiduría oculta"] },
  { id: 3,  name: "La Emperatriz",   num: "III",   sym: "♀", clr: "#7DB57D", keywords: ["Fertilidad", "Abundancia", "Creación"] },
  { id: 4,  name: "El Emperador",    num: "IV",    sym: "♦", clr: "#C47A5A", keywords: ["Autoridad", "Estructura", "Estabilidad"] },
  { id: 5,  name: "El Hierofante",   num: "V",     sym: "✞", clr: "#B09860", keywords: ["Tradición", "Enseñanza", "Fe"] },
  { id: 6,  name: "Los Enamorados",  num: "VI",    sym: "♡", clr: "#C4748A", keywords: ["Unión", "Elección", "Vínculo"] },
  { id: 7,  name: "El Carro",        num: "VII",   sym: "⊙", clr: "#7A9EC4", keywords: ["Victoria", "Voluntad", "Avance"] },
  { id: 8,  name: "La Fuerza",       num: "VIII",  sym: "∞", clr: "#C4A47A", keywords: ["Coraje", "Dominio", "Compasión"] },
  { id: 9,  name: "El Ermitaño",     num: "IX",    sym: "☆", clr: "#9090A8", keywords: ["Introspección", "Guía", "Silencio"] },
  { id: 10, name: "La Rueda",        num: "X",     sym: "◎", clr: "#B0C47A", keywords: ["Destino", "Ciclos", "Cambio"] },
  { id: 11, name: "La Justicia",     num: "XI",    sym: "⚖", clr: "#7ABAC4", keywords: ["Equilibrio", "Verdad", "Karma"] },
  { id: 12, name: "El Colgado",      num: "XII",   sym: "⌛", clr: "#8E8EC4", keywords: ["Sacrificio", "Pausa", "Perspectiva"] },
  { id: 13, name: "La Muerte",       num: "XIII",  sym: "☽", clr: "#787896", keywords: ["Transformación", "Fin", "Renacer"] },
  { id: 14, name: "La Templanza",    num: "XIV",   sym: "≈", clr: "#7AC4B0", keywords: ["Alquimia", "Mesura", "Armonía"] },
  { id: 15, name: "El Diablo",       num: "XV",    sym: "⛧", clr: "#A06060", keywords: ["Apego", "Sombra", "Materia"] },
  { id: 16, name: "La Torre",        num: "XVI",   sym: "⚡", clr: "#C4907A", keywords: ["Ruptura", "Revelación", "Caída"] },
  { id: 17, name: "La Estrella",     num: "XVII",  sym: "★", clr: "#7AB0C4", keywords: ["Esperanza", "Inspiración", "Guía"] },
  { id: 18, name: "La Luna",         num: "XVIII", sym: "◐", clr: "#8E84B8", keywords: ["Ilusión", "Sueños", "Subconsciente"] },
  { id: 19, name: "El Sol",          num: "XIX",   sym: "☀", clr: "#D4C060", keywords: ["Claridad", "Alegría", "Vitalidad"] },
  { id: 20, name: "El Juicio",       num: "XX",    sym: "♪", clr: "#C0A07A", keywords: ["Llamado", "Despertar", "Redención"] },
  { id: 21, name: "El Mundo",        num: "XXI",   sym: "◉", clr: "#7AC47A", keywords: ["Plenitud", "Cierre", "Totalidad"] },
];

const POSITIONS = ["Pasado", "Presente", "Futuro"];

function pickThreeCards(seed = Date.now()) {
  const arr = [...MAJOR_ARCANA];
  const out: { card: CardData; reversed: boolean }[] = [];
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(rand() * arr.length);
    const [card] = arr.splice(idx, 1);
    out.push({ card, reversed: rand() < 0.35 });
  }
  return out;
}

function SacredBg() {
  return (
    <div className="sacred-bg" aria-hidden>
      <div className="sacred-stars">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="sacred-star"
            style={{
              left: `${(i * 137.5) % 100}%`,
              top: `${(i * 73.3) % 100}%`,
              width: `${0.5 + ((i * 17) % 25) / 10}px`,
              height: `${0.5 + ((i * 17) % 25) / 10}px`,
              animationDelay: `${(i % 13) * 0.4}s`,
              animationDuration: `${3 + (i % 7)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Gemini AI Reading ─────────────────────────────────────────────────────────
async function getAIReading(
  question: string,
  draw: { card: CardData; reversed: boolean }[]
): Promise<string[]> {
  const cardList = draw
    .map(
      (d, i) =>
        `${POSITIONS[i].toUpperCase()}: ${d.card.name}${d.reversed ? " (Invertida)" : ""} — Palabras clave: ${d.card.keywords.join(", ")}`
    )
    .join("\n");

  const prompt = `Eres un oráculo místico y sabio tarotista. Tu voz es poética, cálida y profunda.

El consultante pregunta: "${question || "lectura abierta, sin pregunta específica"}"

Cartas reveladas en la tirada Pasado – Presente – Futuro:
${cardList}

Escribe una lectura íntima y personalizada en español. Reglas:
- Habla directamente al consultante usando "tú".
- Un párrafo por carta conectándola con su posición y la pregunta.
- Un párrafo final integrando el mensaje de las tres cartas.
- Tono poético, sabio y compasivo. Nunca genérico.
- Máximo 380 palabras. Sin títulos. Solo párrafos fluidos separados por salto de línea.`;

  const key = import.meta.env.VITE_GEMINI_KEY;
  if (!key) return mockReading(question, draw);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 900,
          },
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini error ${res.status}`);
    const data = await res.json();
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.split("\n").filter((p: string) => p.trim().length > 0);
  } catch (err) {
    console.error("Gemini error:", err);
    return mockReading(question, draw);
  }
}

function mockReading(question: string, draw: { card: CardData; reversed: boolean }[]) {
  const polar = (d: { reversed: boolean }) =>
    d.reversed ? "aparece invertida, su fuerza vuelta hacia adentro" : "se muestra erguida, plena en su simbolismo";
  const q = question?.trim()
    ? `Sobre tu pregunta — "${question.trim()}" — el oráculo responde así:`
    : `Sin pregunta formulada, el oráculo habla en lengua amplia:`;
  return [
    "El oráculo guarda silencio un instante.",
    q,
    `El Pasado porta la energía de ${draw[0].card.name}, que ${polar(draw[0])}. Su voz habla de ${draw[0].card.keywords.map((k) => k.toLowerCase()).join(", ")}.`,
    `El Presente te muestra a ${draw[1].card.name}, que ${polar(draw[1])}. Aquí resuena ${draw[1].card.keywords.map((k) => k.toLowerCase()).join(", ")}.`,
    `El Futuro se abre con ${draw[2].card.name}, que ${polar(draw[2])}. El sendero apunta hacia ${draw[2].card.keywords.map((k) => k.toLowerCase()).join(", ")}.`,
    `Hay un hilo entre las tres: del ${draw[0].card.keywords[0].toLowerCase()} pasaste al ${draw[1].card.keywords[0].toLowerCase()}, y se abre paso al ${draw[2].card.keywords[0].toLowerCase()}. No es casualidad — es ritmo.`,
    "El oráculo cierra los ojos. El tuyo apenas comienza a ver.",
  ];
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TarotReading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [phase, setPhase] = useState<"question" | "shuffle" | "reveal">("question");
  const [question, setQuestion] = useState(() => localStorage.getItem("tarot_question") || "");
  const [draw, setDraw] = useState<{ card: CardData; reversed: boolean }[]>([]);
  const [revealed, setRevealed] = useState([false, false, false]);
  const [readingShown, setReadingShown] = useState(false);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [paragraphsShown, setParagraphsShown] = useState(0);
  const [loadingReading, setLoadingReading] = useState(false);

  const savedPlan = JSON.parse(localStorage.getItem("tarot_plan") || "{}");

  useEffect(() => {
    const status = searchParams.get("payment_status");
    if (status === "approved") {
      const savedQ = localStorage.getItem("tarot_question") || "";
      setQuestion(savedQ);
      startReveal(savedQ);
    }
  }, []);

  const startReveal = (q: string) => {
    const seed = Date.now() + (q?.length || 0) * 31;
    const newDraw = pickThreeCards(seed);
    setDraw(newDraw);
    setRevealed([false, false, false]);
    setReadingShown(false);
    setParagraphsShown(0);
    setParagraphs([]);
    setPhase("reveal");
    setTimeout(() => setRevealed([true, false, false]), 500);
    setTimeout(() => setRevealed([true, true, false]), 1100);
    setTimeout(() => setRevealed([true, true, true]), 1700);
  };

  const submitQuestion = () => {
    localStorage.setItem("tarot_question", question);
    setPhase("shuffle");
    setTimeout(() => startReveal(question), 2200);
  };

  const allRevealed = revealed.every(Boolean);

  useEffect(() => {
    if (!allRevealed || readingShown || draw.length === 0) return;
    const timer = setTimeout(async () => {
      setReadingShown(true);
      setLoadingReading(true);
      const ps = await getAIReading(question, draw);
      setParagraphs(ps);
      setLoadingReading(false);
      let i = 0;
      const tick = () => {
        i += 1;
        setParagraphsShown(i);
        if (i < ps.length) setTimeout(tick, 650);
      };
      setTimeout(tick, 300);
    }, 900);
    return () => clearTimeout(timer);
  }, [allRevealed, readingShown, draw]);

  const startOver = () => {
    setPhase("question");
    setDraw([]);
    setRevealed([false, false, false]);
    setReadingShown(false);
    setParagraphs([]);
    setParagraphsShown(0);
    setQuestion("");
    localStorage.removeItem("tarot_question");
  };

  return (
    <div className="reading-page">
      <SacredBg />

      {/* Header */}
      <header className="t-reading-header">
        <button className="t-reading-back" onClick={() => navigate("/tarot")}>
          ← volver
        </button>
        <div className="t-reading-crest">
          <span>✦</span>
          <span>AION · Oráculo</span>
          <span>✦</span>
        </div>
        <div className="t-reading-plan-tag">
          {savedPlan?.name && (
            <span>
              Plan <strong style={{ color: "var(--gold)" }}>{savedPlan.name}</strong>
            </span>
          )}
        </div>
      </header>

      <main className="t-reading-main">

        {/* ── Phase: Question ── */}
        {phase === "question" && (
          <section className="t-question-section">
            <div className="t-rq-eyebrow">paso 01 · formula tu pregunta</div>
            <h2 className="t-rq-title">¿Qué quieres consultar al oráculo?</h2>
            <p className="t-rq-sub">
              Escribe tu pregunta con honestidad. Cuanto más clara, más nítida la respuesta.
            </p>
            <div className="t-rq-field">
              <textarea
                className="t-rq-input"
                placeholder="ej. ¿Es momento de soltar este vínculo y abrir paso a algo nuevo?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={280}
                rows={3}
                autoFocus
              />
              <div className="t-rq-count">{question.length}/280</div>
            </div>
            <div className="t-rq-actions">
              <button className="t-btn-gold" onClick={submitQuestion}>
                <span className="t-btn-gold-glyph">✦</span>
                <span>Mezclar el Mazo</span>
                <span className="t-btn-gold-glyph">✦</span>
              </button>
              <button
                className="t-btn-ghost"
                onClick={() => { setQuestion(""); submitQuestion(); }}
              >
                Tirar sin pregunta
              </button>
            </div>
            <div className="t-rq-hint">tu pregunta se guarda solo en tu dispositivo</div>
          </section>
        )}

        {/* ── Phase: Shuffle ── */}
        {phase === "shuffle" && (
          <section className="t-shuffle">
            <div className="t-shuffle-stage">
              <div className="t-shuffle-card" />
              <div className="t-shuffle-card" />
              <div className="t-shuffle-card" />
              <div className="t-shuffle-card" />
              <div className="t-shuffle-card" />
            </div>
            <div className="t-shuffle-text">
              <div className="t-rq-eyebrow">paso 02</div>
              <h3 className="t-shuffle-title">El mazo se mezcla en silencio…</h3>
              <p className="t-shuffle-sub">Respira hondo. El oráculo elige por ti.</p>
            </div>
          </section>
        )}

        {/* ── Phase: Reveal ── */}
        {phase === "reveal" && draw.length > 0 && (
          <section className="t-reveal">
            <div className="t-reveal-question">
              {question ? (
                <>
                  <span className="t-rq-label">tu pregunta</span>
                  <blockquote className="t-reveal-blockquote">"{question}"</blockquote>
                </>
              ) : (
                <blockquote
                  className="t-reveal-blockquote"
                  style={{ color: "var(--whisper)", fontSize: "16px", letterSpacing: "0.3em", textTransform: "uppercase" }}
                >
                  — lectura abierta —
                </blockquote>
              )}
            </div>

            <div className="t-cards-row">
              {draw.map((d, i) => (
                <TarotCard
                  key={i}
                  card={d.card}
                  reversed={d.reversed}
                  position={POSITIONS[i]}
                  revealed={revealed[i]}
                  onReveal={() =>
                    setRevealed((r) => { const n = [...r]; n[i] = true; return n; })
                  }
                  autoRevealDelay={600}
                />
              ))}
            </div>

            {!allRevealed && (
              <div className="t-reveal-actions">
                <div className="t-reveal-progress">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`t-rp-dot ${revealed[i] ? "is-on" : ""}`} />
                  ))}
                </div>
              </div>
            )}

            {readingShown && (
              <section className="t-oracle">
                <div className="t-oracle-divider">
                  <span /><span style={{ fontSize: "14px" }}>✦</span><span />
                </div>
                <div className="t-oracle-eyebrow">lectura del oráculo · gemini ai</div>
                <h3 className="t-oracle-title">La voz de las cartas</h3>
                <div className="t-oracle-body">
                  {loadingReading && <span className="t-oracle-cursor">▍</span>}
                  {paragraphs.slice(0, paragraphsShown).map((p, i) => (
                    <p key={i} className="t-oracle-p">{p}</p>
                  ))}
                  {!loadingReading && paragraphsShown < paragraphs.length && (
                    <span className="t-oracle-cursor">▍</span>
                  )}
                </div>

                {paragraphsShown >= paragraphs.length && paragraphs.length > 0 && (
                  <div className="t-oracle-actions">
                    <button className="t-btn-ghost" onClick={() => navigate("/tarot")}>
                      Volver al oráculo
                    </button>
                    <button className="t-btn-gold t-btn-gold--solid" onClick={startOver}>
                      Nueva consulta
                    </button>
                  </div>
                )}
              </section>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
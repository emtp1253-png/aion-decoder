// src/pages/TarotPage.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../tarot.css";

const TAROT_PLANS = [
  {
    id: "basico",
    roman: "I",
    name: "Básico",
    tagline: "Una pregunta. Tres cartas.",
    price: 99,
    description: "Una consulta breve al oráculo para iluminar una pregunta puntual.",
    features: ["1 pregunta al oráculo", "Tirada de 3 cartas", "Lectura simbólica esencial", "Disponible al instante"],
    featured: false,
  },
  {
    id: "profundo",
    roman: "II",
    name: "Profundo",
    tagline: "Tres preguntas. Tirada completa.",
    price: 199,
    description: "Para los momentos que requieren más que una sola respuesta.",
    features: ["3 preguntas al oráculo", "Tirada completa de 10 cartas", "Lectura simbólica e interpretativa", "Reflexión guiada por capas", "Descarga en PDF"],
    featured: true,
  },
  {
    id: "maestro",
    roman: "III",
    name: "Maestro",
    tagline: "Lectura profunda. Guía personal.",
    price: 349,
    description: "Una sesión completa con interpretación expandida y guía personalizada.",
    features: ["Preguntas ilimitadas (24h)", "Tirada Cruz Celta + Árbol", "Guía personal redactada", "Audio de meditación vinculado", "Seguimiento a 7 días"],
    featured: false,
  },
];

function SacredGeometryBg() {
  return (
    <div className="sacred-bg" aria-hidden>
      <div className="sacred-stars">
        {Array.from({ length: 80 }).map((_, i) => {
          const left = (i * 137.5) % 100;
          const top = (i * 73.3) % 100;
          const size = 0.5 + ((i * 17) % 25) / 10;
          const delay = (i % 13) * 0.4;
          const dur = 3 + (i % 7);
          return (
            <span key={i} className="sacred-star" style={{ left: `${left}%`, top: `${top}%`, width: `${size}px`, height: `${size}px`, animationDelay: `${delay}s`, animationDuration: `${dur}s` }} />
          );
        })}
      </div>
      <svg className="sacred-geom" viewBox="0 0 800 800" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4">
          <circle cx="400" cy="400" r="380" />
          <circle cx="400" cy="400" r="300" />
          <circle cx="400" cy="400" r="220" />
          <circle cx="400" cy="400" r="140" />
          <circle cx="400" cy="400" r="60" />
          <g transform="translate(400 400)">
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i * Math.PI) / 3;
              return <circle key={i} cx={Math.cos(a) * 140} cy={Math.sin(a) * 140} r="140" />;
            })}
          </g>
          <polygon points="400,80 720,620 80,620" />
          <polygon points="400,720 80,180 720,180" />
        </g>
      </svg>
    </div>
  );
}

export default function TarotPage() {
  const navigate = useNavigate();
  const pricingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [payingPlan, setPayingPlan] = useState<(typeof TAROT_PLANS)[0] | null>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBuy = async (plan: typeof TAROT_PLANS[0]) => {
    setLoading(plan.id);
    setPayingPlan(plan);
    setPaying(true);

    // Save plan so reading page knows what was purchased
    localStorage.setItem("tarot_plan", JSON.stringify(plan));
    // Clear any previous question
    localStorage.setItem("tarot_question", "");

    try {
      const returnUrl = `${window.location.origin}/tarot/lectura?payment_status=approved`;
      const response = await fetch("https://axion-api-rosy.vercel.app/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `AION Tarot - ${plan.name}`,
          price: plan.price,
          quantity: 1,
          back_url: returnUrl,
        }),
      });

      if (!response.ok) throw new Error("Error en el servidor");
      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió link de pago");
      }
    } catch (error) {
      console.error("Error al generar pago:", error);
      setPaying(false);
      setLoading(null);
      alert("⚠️ No se pudo conectar con el servidor de pagos. Intenta de nuevo.");
    }
  };

  return (
    <div className="tarot-page" ref={scrollerRef}>
      <SacredGeometryBg />

      {/* ── HERO ── */}
      <section className="t-hero">
        <div className="t-hero-inner">
          <div className="t-hero-eyebrow">
            <span className="t-hero-eyebrow-line" />
            <span>AION · Oráculo</span>
            <span className="t-hero-eyebrow-line" />
          </div>
          <h1 className="t-hero-title">
            <span className="t-hero-title-line">El Oráculo</span>
            <span className="t-hero-title-line t-hero-title-em">te Espera</span>
          </h1>
          <p className="t-hero-sub">
            En el silencio entre cartas late el destino.<br />
            Veintidós voces ancestrales aguardan tu pregunta —<br />
            <span className="t-hero-sub-em">deja que el azar diga lo que el alma ya sabe.</span>
          </p>
          <div className="t-hero-cta-wrap">
            <button className="t-btn-gold" onClick={scrollToPricing}>
              <span className="t-btn-gold-glyph">✦</span>
              <span>Consultar las Cartas</span>
              <span className="t-btn-gold-glyph">✦</span>
            </button>
            <div className="t-hero-meta">
              <span>Tirada al instante</span>
              <span className="t-dot">·</span>
              <span>Pago seguro</span>
              <span className="t-dot">·</span>
              <span>22 Arcanos Mayores</span>
            </div>
          </div>
          <div className="t-hero-scroll" onClick={scrollToPricing}>
            <span>elige tu camino</span>
            <span className="t-hero-scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="t-pricing" ref={pricingRef} id="pricing">
        <div className="t-pricing-head">
          <div className="t-pricing-eyebrow">
            <span>·</span><span>tres senderos</span><span>·</span>
          </div>
          <h2 className="t-pricing-title">Elige tu profundidad</h2>
          <p className="t-pricing-sub">
            Cada plan abre una puerta distinta hacia el oráculo. No hay respuesta pequeña.
          </p>
        </div>

        <div className="t-plans">
          {TAROT_PLANS.map((plan) => (
            <div key={plan.id} className={`t-plan ${plan.featured ? "is-featured" : ""}`}>
              {plan.featured && <div className="t-plan-flag">Más elegido</div>}
              <div className="t-plan-roman">{plan.roman}</div>
              <div className="t-plan-name">{plan.name}</div>
              <div className="t-plan-tagline">{plan.tagline}</div>
              <div className="t-plan-price-row">
                <span className="t-plan-price-currency">$</span>
                <span className="t-plan-price-amount">{plan.price}</span>
                <span className="t-plan-price-unit">MXN</span>
              </div>
              <div className="t-plan-divider" />
              <ul className="t-plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className="t-plan-feature-glyph">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`t-btn-gold t-plan-cta ${plan.featured ? "t-btn-gold--solid" : ""}`}
                onClick={() => handleBuy(plan)}
                disabled={loading === plan.id}
              >
                <span>{loading === plan.id ? "Procesando…" : `Elegir ${plan.name}`}</span>
              </button>
              <div className="t-plan-foot">{plan.description}</div>
            </div>
          ))}
        </div>

        <div className="t-pricing-foot">
          <span>Pago procesado por MercadoPago</span>
          <span className="t-dot">·</span>
          <span>Sin suscripciones</span>
          <span className="t-dot">·</span>
          <span>Pago único</span>
        </div>
      </section>

      {/* ── MercadoPago overlay ── */}
      {paying && (
        <div className="t-pay-overlay">
          <div className="t-pay-card">
            <div className="t-pay-glyph">✦</div>
            <div className="t-pay-title">Redirigiendo a MercadoPago</div>
            <div className="t-pay-sub">{payingPlan?.name} · ${payingPlan?.price} MXN</div>
            <div className="t-pay-bar"><span className="t-pay-bar-inner" /></div>
            <div className="t-pay-foot">conexión segura</div>
          </div>
        </div>
      )}
    </div>
  );
}

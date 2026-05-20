import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  { 
    id: "esencial", 
    name: "Esencial", 
    price: 99.99, 
    icon: "❃", 
    tagline: "Claridad Inmediata" 
  },
  { 
    id: "profundo", 
    name: "Profundo", 
    price: 199.99, 
    icon: "◈", 
    tagline: "Equilibrio Estratégico",
    recommended: true 
  },
  { 
    id: "maestro", 
    name: "Maestro AION", 
    price: 399.99, 
    icon: "⚛", 
    tagline: "Dominio Total" 
  },
];

const TerminalSection = () => {
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); 
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!formData.name || !formData.date) {
      alert("Falta el nombre o la fecha para iniciar la secuencia.");
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch("https://axion-api-rosy.vercel.app/api/create_preference", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Lectura AION: ${selectedPlan.name}`,
          price: Number(selectedPlan.price),
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("El servidor no devolvió un punto de inicio.");
      }
    } catch (error) {
      console.error("❌ Falla en la Terminal:", error);
      alert("❌ ERROR DE CONEXIÓN: Verifica tu internet e intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <section id="terminal" className="relative py-20 bg-void text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="mb-10 w-full bg-gold/10 border-y border-gold/30 py-3 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <div className="flex justify-center text-center animate-pulse">
            <span className="font-mono text-[10px] md:text-xs text-gold uppercase tracking-widest font-bold">
              ⚡️ APERTURA OFICIAL: SINCRONIZACIÓN NATAL ACTIVA ⚡️
            </span>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="font-mono text-[10px] text-gold/60 tracking-[0.3em] uppercase mb-2">Módulo de Análisis Destino</p>
          <h2 className="text-4xl font-display text-gold tracking-widest uppercase">Terminal de Análisis</h2>
        </div>

        <div className="border border-gold/20 bg-void-light shadow-2xl overflow-hidden rounded-sm">
          <div className="bg-gold/10 border-b border-gold/20 p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-[10px] text-gold/60 ml-4">AION://ANALYSIS-INTERFACE_V7</span>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-mono text-[10px] text-gold/50 uppercase block mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Vidente Fernandez" 
                  className="w-full bg-void border border-gold/20 p-3 font-mono text-sm text-white focus:border-gold outline-none transition-all placeholder:text-gold/20" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gold/50 uppercase block mb-2">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  className="w-full bg-void border border-gold/20 p-3 font-mono text-sm text-white focus:border-gold outline-none [color-scheme:dark]" 
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gold/50 uppercase block mb-2">Hora (Opcional)</label>
                <input 
                  type="time" 
                  className="w-full bg-void border border-gold/20 p-3 font-mono text-sm text-white focus:border-gold outline-none [color-scheme:dark]" 
                  onChange={(e) => setFormData({...formData, time: e.target.value})} 
                />
              </div>
            </div>

            <div className="border-t border-gold/10 pt-8">
              <div className="text-center mb-8 px-4">
                <h4 className="text-gold font-display text-lg uppercase tracking-[0.2em] mb-4">Sincronización de Ejes</h4>
                <p className="text-gray-300 text-[13px] font-body max-w-2xl mx-auto leading-relaxed italic">
                  "El destino no es azar, es un patrón matemático esperando ser decodificado."
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative p-5 border transition-all flex flex-col items-center gap-2 ${
                      selectedPlan.id === plan.id 
                      ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                      : "border-gold/10 hover:border-gold/30 hover:bg-gold/5"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 bg-gold text-void text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                        Recomendado
                      </span>
                    )}
                    <span className="text-2xl text-gold mb-1">{plan.icon}</span>
                    <span className="font-display text-[10px] tracking-[0.2em] uppercase">{plan.name}</span>
                    <span className="font-mono text-[11px] text-white font-bold">${plan.price} <span className="text-[8px] text-gold/60">MXN</span></span>
                    <span className="font-mono text-[9px] text-gold/40 italic">{plan.tagline}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center min-h-[80px]">
              <button
                onClick={handleProcess}
                disabled={loading}
                className="w-full max-w-md py-4 bg-gold/5 border border-gold text-gold font-display text-sm uppercase tracking-[0.3em] hover:bg-gold hover:text-void transition-all disabled:opacity-50 disabled:cursor-wait"
              >
                {loading ? "Calculando Coordenadas..." : "Ejecutar y Generar Orden de Pago"}
              </button>
              <p className="font-mono text-[9px] text-gold/40 mt-6 italic">
                {formData.name ? `> Preparando matriz para: ${formData.name.toUpperCase()}...` : "> Esperando entrada de terminal..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
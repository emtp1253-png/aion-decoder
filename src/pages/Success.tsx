import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";

const Success = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📞 CONFIGURACIÓN DE WHATSAPP
  const PHONE_NUMBER = "521234567890"; // 👈 Sustituye por tu número (ej: 52 + 10 dígitos)
  
  const generateWhatsAppLink = () => {
    const message = `¡Hola AION! ✨ Acabo de realizar mi pago. 
Mi nombre es: ${formData.name}. 
Mis datos: ${formData.birthDate} a las ${formData.birthTime} en ${formData.birthPlace}. 
Quedo atento para el envío de mis documentos.`;
    
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6 relative overflow-hidden text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_50%_54%/0.05)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md border border-gold/20 bg-void-light p-8 md:p-10 shadow-2xl rounded-sm"
      >
        {!isSubmitted ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <CheckCircle className="w-16 h-16 text-gold mb-4" strokeWidth={1.5} />
              <h1 className="font-display text-3xl text-gold mb-2 text-center uppercase tracking-tighter">
                ¡Pago Confirmado!
              </h1>
              <p className="font-mono text-[10px] text-gold/60 text-center uppercase tracking-widest">
                Ingresa tus coordenadas natales
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-[10px] text-gold/60 uppercase block mb-2">Nombre Completo</label>
                <input required type="text" name="name" onChange={handleChange} className="w-full bg-void border border-gold/20 px-4 py-3 font-mono text-sm text-foreground focus:border-gold outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-gold/60 uppercase block mb-2">Fecha</label>
                  <input required type="date" name="birthDate" onChange={handleChange} className="w-full bg-void border border-gold/20 px-4 py-3 font-mono text-sm [color-scheme:dark] outline-none" />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gold/60 uppercase block mb-2">Hora</label>
                  <input required type="time" name="birthTime" onChange={handleChange} className="w-full bg-void border border-gold/20 px-4 py-3 font-mono text-sm [color-scheme:dark] outline-none" />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-gold/60 uppercase block mb-2">Lugar de Nacimiento</label>
                <input required type="text" name="birthPlace" onChange={handleChange} placeholder="Ciudad, País" className="w-full bg-void border border-gold/20 px-4 py-3 font-mono text-sm focus:border-gold outline-none" />
              </div>

              <button type="submit" disabled={loading} className="w-full mt-2 bg-gold/5 border border-gold text-gold font-display text-sm tracking-[0.2em] uppercase py-4 hover:bg-gold hover:text-void transition-all duration-300">
                {loading ? "Sincronizando..." : "Confirmar Datos de Análisis"}
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-6">
            <h2 className="font-display text-2xl text-gold mb-4 uppercase">Secuencia Iniciada</h2>
            <p className="text-gray-400 text-sm font-body mb-8 leading-relaxed">
              Tus datos han sido encriptados. Para agilizar el envío de tus documentos y reportes finales, por favor contacta a tu analista vía WhatsApp.
            </p>
            
            <a 
              href={generateWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-display text-xs tracking-widest uppercase hover:bg-white hover:text-[#25D366] transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </a>

            <a href="/" className="mt-8 text-gold/40 hover:text-gold text-[10px] font-mono uppercase tracking-widest transition-colors">
              [ Finalizar Sesión ]
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Success;
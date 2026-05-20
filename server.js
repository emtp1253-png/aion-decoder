import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

// 🚀 CARGA DE COMBUSTIBLE (.env)
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🚀 LA LLAVE MAESTRA REFORZADA: 
// Configurado para que el iPhone y Android no bloqueen la señal del subdominio
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}));

app.use(express.json());

// CONFIGURACIÓN DE MERCADO PAGO
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || "" 
});

console.log("-----------------------------------------");
console.log("🚀 AION: REACTOR DE PAGOS V8 ACTIVO");
console.log("📍 UBICACIÓN: RAÍZ DEL SUBDOMINIO");
console.log("-----------------------------------------");

// 🟢 RUTA DIAGNÓSTICA (Para que NUNCA más veas "Cannot GET /")
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0a0a0a; color: #d4af37; border: 2px solid #d4af37; border-radius: 10px; margin: 20px;">
      <h1>🚀 REACTOR AION V8: ¡OPERATIVO!</h1>
      <p style="color: white;">El puente entre el subdominio y Mercado Pago está abierto y blindado.</p>
      <hr style="border: 0; border-top: 1px solid #d4af37; width: 50px;">
      <p style="font-size: 0.8rem; color: #666;">Ingeniería Emmanuel Sandoval - 2026</p>
    </div>
  `);
});

// 💰 GENERADOR DE PAGOS
app.post("/create_preference", async (req, res) => {
  try {
    const { title, price, quantity, userData } = req.body;
    const preference = new Preference(client);

    if (userData) {
      console.log(`📥 PROCESANDO: ${userData.name.toUpperCase()} - PLAN: ${title}`);
    }

    const result = await preference.create({
      body: {
        items: [
          {
            title: title || "Lectura AION",
            quantity: Number(quantity) || 1,
            unit_price: Number(price),
            currency_id: "MXN",
          },
        ],
        back_urls: {
          success: "https://aiondestino.com.mx/success", 
          failure: "https://aiondestino.com.mx/",
          pending: "https://aiondestino.com.mx/success",
        },
        auto_return: "approved", 
        binary_mode: true, 
      },
    });

    console.log(`✅ ÉXITO: Link generado para ${title} - ID: ${result.id}`);
    
    res.json({ 
      id: result.id, 
      init_point: result.init_point 
    });

  } catch (error) {
    console.error("\n❌ FALLA EN MERCADO PAGO:", error);
    res.status(500).json({ error: "Falla en la pasarela central. Revisa el token en .env" });
  }
});

app.post("/submit_birth_data", (req, res) => {
  console.log("\n✨ DATOS NATALES RECIBIDOS:", req.body);
  res.status(200).json({ status: "ok" });
});

app.get("/ping", (req, res) => {
  res.status(200).send("Reactor AION en línea.");
});

// 🛡️ ESCUDO CONTRA CAÍDAS
app.listen(port, () => {
  console.log(`📡 Señal emitida en puerto: ${port}`);
});

process.on('uncaughtException', (err) => console.error('🛡️ Error evitado (Uncaught):', err));
process.on('unhandledRejection', (reason) => console.error('🛡️ Rechazo evitado (Unhandled):', reason));
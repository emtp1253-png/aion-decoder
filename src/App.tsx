// src/App.tsx — REEMPLAZA tu App.tsx actual con este
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Success from "./pages/Success.tsx";
import TarotPage from "./pages/TarotPage.tsx";
import TarotReading from "./pages/TarotReading.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page Principal */}
          <Route path="/" element={<Index />} />

          {/* 🎯 Formulario post-pago AION */}
          <Route path="/success" element={<Success />} />

          {/* 🃏 Tarot — Landing + Precios */}
          <Route path="/tarot" element={<TarotPage />} />

          {/* 🔮 Tarot — Lectura de cartas */}
          <Route path="/tarot/lectura" element={<TarotReading />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

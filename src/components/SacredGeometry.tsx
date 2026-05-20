const SacredGeometry = ({ className = '' }: { className?: string }) => {
  const goldColor = '#D4AF37'; // Tono de oro metálico y lustroso

  // Caracteres y glifos para la fusión ancestral
  const baziChars = ['木', '火', '土', '金', '水']; // 5 Elementos BaZi
  const mayanGlyphs = ['☉', '⚕', '⊕', '✧']; // Representaciones de Kin: Sol, Serpiente, Tierra, Estrella

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          {/* Filtro SVG para un efecto de brillo sutil */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Capa de Fusión Ancestral (baja opacidad) */}
        <g opacity="0.05" fill={goldColor} className="font-serif">
          {baziChars.map((char, i) => (
            <text key={`bazi-${i}`} x={40 + i * 80} y={40} fontSize="20" textAnchor="middle">{char}</text>
          ))}
          {mayanGlyphs.map((glyph, i) => (
            <text key={`mayan-${i}`} x={80 + i * 80} y={360} fontSize="22" textAnchor="middle">{glyph}</text>
          ))}
        </g>

        {/* Geometría Sagrada Intensificada con Brillo y Pulso */}
        <g style={{ filter: 'url(#glow)' }} className="animate-pulse-slow">
          {/* Círculo exterior */}
          <circle cx="200" cy="200" r="190" fill="none" stroke={goldColor} strokeWidth="0.6" className="animate-rotate-slow" style={{ transformOrigin: '200px 200px' }} opacity="0.8" />

          {/* Flor de la Vida - 7 círculos */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 200 + 60 * Math.cos((angle * Math.PI) / 180);
            const y = 200 + 60 * Math.sin((angle * Math.PI) / 180);
            return <circle key={i} cx={x} cy={y} r="60" fill="none" stroke={goldColor} strokeWidth="0.4" opacity="0.5" />;
          })}
          <circle cx="200" cy="200" r="60" fill="none" stroke={goldColor} strokeWidth="0.4" opacity="0.5" />

          {/* Hexágono interior */}
          <polygon
            points={[0, 1, 2, 3, 4, 5].map(i => {
              const angle = (i * 60 - 30) * Math.PI / 180;
              return `${200 + 100 * Math.cos(angle)},${200 + 100 * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke={goldColor}
            strokeWidth="0.5"
            className="animate-rotate-reverse"
            style={{ transformOrigin: '200px 200px' }}
            opacity="0.7"
          />

          {/* Anillos tipo astrolabio */}
          <circle cx="200" cy="200" r="150" fill="none" stroke={goldColor} strokeWidth="0.4" strokeDasharray="4 8" className="animate-rotate-slow" style={{ transformOrigin: '200px 200px' }} opacity="0.6" />
          <circle cx="200" cy="200" r="120" fill="none" stroke={goldColor} strokeWidth="0.4" strokeDasharray="2 6" className="animate-rotate-reverse" style={{ transformOrigin: '200px 200px' }} opacity="0.6" />

          {/* Líneas cruzadas */}
          {[0, 30, 60, 90, 120, 150].map((angle, i) => {
            const x1 = 200 + 190 * Math.cos((angle * Math.PI) / 180);
            const y1 = 200 + 190 * Math.sin((angle * Math.PI) / 180);
            const x2 = 200 - 190 * Math.cos((angle * Math.PI) / 180);
            const y2 = 200 - 190 * Math.sin((angle * Math.PI) / 180);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={goldColor} strokeWidth="0.25" opacity="0.4" />;
          })}

          {/* Marcadores de grados */}
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 5) * Math.PI / 180;
            const inner = 185;
            const outer = 190;
            return (
              <line
                key={`tick-${i}`}
                x1={200 + inner * Math.cos(angle)}
                y1={200 + inner * Math.sin(angle)}
                x2={200 + outer * Math.cos(angle)}
                y2={200 + outer * Math.sin(angle)}
                stroke={goldColor}
                strokeWidth="0.6"
                opacity="0.75"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SacredGeometry;

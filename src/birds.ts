// Hand-authored flat-vector Swara bird mascot — replaces the anime-character
// art from the design reference with an on-brand illustration (no image-gen
// tool available in this environment, so the mascot is built from SVG shapes).

export const heroBird = `
<svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Swara mascot bird wearing a headset">
  <defs>
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22c3b3"/>
      <stop offset="100%" stop-color="#0f9d90"/>
    </linearGradient>
  </defs>
  <ellipse cx="160" cy="330" rx="70" ry="12" fill="#0b2436" opacity="0.12"/>
  <path d="M60 210 C40 170 55 130 100 118 C95 90 130 70 150 90 C165 65 205 70 210 100 C245 105 260 145 235 175 C255 195 250 230 220 245 L215 300 C215 320 190 335 160 335 C130 335 95 322 92 300 L88 240 C65 235 55 222 60 210 Z" fill="url(#bodyGrad)"/>
  <path d="M62 150 C40 120 55 85 95 85 C100 105 95 128 88 145 C80 152 68 152 62 150 Z" fill="#0c8074"/>
  <path d="M96 205 C70 225 55 260 75 290 C85 275 80 250 96 225 Z" fill="#0c8074"/>
  <circle cx="205" cy="150" r="30" fill="#ffffff"/>
  <circle cx="214" cy="146" r="12" fill="#0b2436"/>
  <circle cx="218" cy="141" r="4" fill="#ffffff"/>
  <path d="M232 158 L262 168 L234 172 Z" fill="#f2b135"/>
  <path d="M170 120 C185 100 235 95 250 118 C255 128 250 138 240 136 C232 118 200 112 182 128 Z" fill="#0b2436"/>
  <path d="M240 136 C252 138 262 148 262 162" stroke="#0b2436" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="262" cy="164" r="7" fill="#0b2436"/>
  <path d="M170 122 C160 118 152 122 150 130" stroke="#0b2436" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="150" cy="132" r="7" fill="#0b2436"/>
  <path d="M228 172 C232 182 230 192 220 196" stroke="#0b2436" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="219" cy="197" r="4.5" fill="#ff5a5f"/>
</svg>`;

export const friendlyBird = `
<svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Friendly voice bird">
  <path d="M30 110 C15 80 30 45 70 45 C110 45 128 80 112 110 C118 130 105 150 80 150 C55 150 42 130 30 110 Z" fill="#22c3b3"/>
  <path d="M28 70 C15 50 25 25 50 28 C52 45 48 62 42 72 Z" fill="#0c8074"/>
  <circle cx="95" cy="68" r="15" fill="#ffffff"/>
  <circle cx="100" cy="65" r="6" fill="#0b2436"/>
  <circle cx="102" cy="63" r="2" fill="#fff"/>
  <path d="M108 74 L124 79 L110 83 Z" fill="#f2b135"/>
  <path d="M75 40 C88 28 118 26 126 42" stroke="#0b2436" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="126" cy="44" r="5" fill="#0b2436"/>
  <circle cx="75" cy="40" r="5" fill="#0b2436"/>
  <path d="M118 46 C124 52 122 60 114 62" stroke="#0b2436" stroke-width="3.5" fill="none" stroke-linecap="round"/>
</svg>`;

export const formalBird = `
<svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Formal voice bird">
  <path d="M30 110 C15 80 30 45 70 45 C110 45 128 80 112 110 C118 130 105 150 80 150 C55 150 42 130 30 110 Z" fill="#1c2b3a"/>
  <path d="M28 70 C15 50 25 25 50 28 C52 45 48 62 42 72 Z" fill="#0b2030"/>
  <circle cx="95" cy="68" r="15" fill="#ffffff"/>
  <circle cx="100" cy="65" r="6" fill="#0b2436"/>
  <circle cx="102" cy="63" r="2" fill="#fff"/>
  <path d="M108 74 L124 79 L110 83 Z" fill="#f2b135"/>
  <path d="M78 118 L88 118 L83 132 Z" fill="#17a398"/>
  <rect x="79" y="112" width="10" height="8" rx="2" fill="#e9eef2"/>
</svg>`;

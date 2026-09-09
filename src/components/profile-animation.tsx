// Continuous CSS motion keeps this decorative animation out of the JS bundle.
export function ProfileAnimation() {
  return (
    <div className="profile-animation" aria-hidden="true">
      <div className="orbit-scene" aria-hidden="true">
        <svg viewBox="0 0 240 200" fill="none" focusable="false">
          <defs>
            <linearGradient id="orbit-stroke" x1="40" y1="45" x2="200" y2="155" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2eeff" />
              <stop offset=".48" stopColor="#92b7ff" />
              <stop offset="1" stopColor="#5078c6" />
            </linearGradient>
            <radialGradient id="orbit-centre">
              <stop stopColor="#ffffff" />
              <stop offset=".4" stopColor="#d2e1ff" />
              <stop offset="1" stopColor="#719bea" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="100" r="87" stroke="#8aa7d3" strokeOpacity=".16" strokeDasharray="2 9" />
          <g className="orbit-turn orbit-turn-outer">
            <ellipse cx="120" cy="100" rx="79" ry="36" transform="rotate(-30 120 100)" stroke="url(#orbit-stroke)" strokeWidth="1.5" />
            <circle cx="188.416" cy="60.5" r="5" fill="#d5e6ff" />
            <circle cx="51.584" cy="139.5" r="3.5" fill="#87aaff" />
          </g>
          <g className="orbit-turn orbit-turn-middle">
            <ellipse cx="120" cy="100" rx="79" ry="36" transform="rotate(30 120 100)" stroke="url(#orbit-stroke)" strokeWidth="1.5" />
            <circle cx="188.416" cy="139.5" r="4" fill="#a5c3ff" />
          </g>
          <g className="orbit-turn orbit-turn-inner">
            <ellipse cx="120" cy="100" rx="79" ry="36" transform="rotate(90 120 100)" stroke="url(#orbit-stroke)" strokeWidth="1.5" />
            <circle cx="120" cy="21" r="4.5" fill="#f1f6ff" />
          </g>
          <g className="orbit-core">
            <circle cx="120" cy="100" r="23" fill="#92b7ff" fillOpacity=".08" />
            <circle cx="120" cy="100" r="15" fill="#a9c9ff" fillOpacity=".12" />
            <circle cx="120" cy="100" r="7.5" fill="url(#orbit-centre)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

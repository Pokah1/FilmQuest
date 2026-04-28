const globalStyles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.3); }
  }
  @keyframes cardFloat {
    from { transform: translateY(0px); }
    to { transform: translateY(-10px); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px #E2D60944; }
    50% { box-shadow: 0 0 50px #E2D609AA, 0 0 80px #E2D60933; }
  }
  .cta-btn:hover { transform: scale(1.05); transition: transform 0.2s; }
  .genre-pill:hover { background: #E2D609 !important; color: #000 !important; cursor: pointer; transition: all 0.2s; }
  .movie-card:hover { transform: translateY(-8px) scale(1.03) !important; transition: transform 0.3s ease; z-index: 10; }
  @media (max-width: 768px) {
    .hero-cards { display: none !important; }
  }
`;

export default globalStyles;
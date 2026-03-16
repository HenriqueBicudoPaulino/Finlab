import { useState } from "react";

const fmt = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
const fmtPct = (v) => `${Number(v || 0).toFixed(4)}%`;
const fmtPctSimple = (v) => `${Number(v || 0).toFixed(2)}%`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .calc-root {
    min-height: 100vh;
    background: #0a0e17;
    color: #e2e8f0;
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 0 0 80px;
    position: relative;
    overflow-x: hidden;

    .calc-root::before {
    content: '';
    position: fixed;
    top: -200px; left: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,212,110,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
    .calc-root::after {
    content: '';
    position: fixed;
    bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
    .grid-bg {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

    .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,14,23,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #1e293b;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 0;
  }

    .nav-brand {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #00d46e;
    letter-spacing: 0.1em;
    padding: 18px 0;
    margin-right: 32px;
    flex-shrink: 0;
  }
    .nav-tabs {
    display: flex;
    gap: 0;
    flex: 1;
    overflow-x: auto;
  }
    .nav-tabs::-webkit-scrollbar { display: none; }
  }
    .nav-tab {
    padding: 18px 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #475569;
    cursor: pointer;
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
    white-space: nowrap;
  }
    .nav-tab:hover { color: #94a3b8; }
  
    .nav-tab.active {
    color: #00d46e;
    border-bottom-color: #00d46e;
  }

  .container {
    max-width: 700px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  .footer-note {
    text-align: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #1e293b;
    margin-top: 40px;
    letter-spacing: 0.1em;
  }
`;

export default function App() {
  const [tela, setTela] = useState("comparativo");

  const tabs = [
    { id: "comparativo",   label: "À VISTA OU PARCELADO" },
    { id: "investimentos", label: "INVESTIMENTOS" },
    { id: "financiamento", label: "SAC OU PRICE" },
    { id: "consorcio",     label: "CONSÓRCIO | FINANCIAMENTO | POUPAR" },
  ];

  const activeClass = (id) => {
    if (tela !== id) return "";
    return " active";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="calc-root">
        <div className="grid-bg" />

        <nav className="nav">
          <div className="nav-brand">FINLAB</div>
          <div className="nav-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab${activeClass(tab.id)}`}
                onClick={() => setTela(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="container">
          {/* telas */}
          <p className="footer-note">
            PROJETO ACADÊMICO · FINS EDUCACIONAIS · NÃO CONSTITUI RECOMENDAÇÃO DE INVESTIMENTO<br/>
            Enzo Yamaoca Borlini - 236774<br/>
            Henrique Bicudo Paulino da Silva - 235198<br/>
            Lucas Marino Tomazeli - 235198
          </p>
        </div>
      </div>
    </>
  );
}
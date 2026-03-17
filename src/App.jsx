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
  }

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
  .nav-tab.active        { color: #00d46e; border-bottom-color: #00d46e; }

  .container {
    max-width: 700px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  .header { margin-bottom: 40px; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0,212,110,0.1);
    border: 1px solid rgba(0,212,110,0.25);
    color: #00d46e;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    padding: 5px 12px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .badge::before {
    content: '';
    width: 6px; height: 6px;
    background: #00d46e;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .badge.blue {
    background: rgba(59,130,246,0.1);
    border-color: rgba(59,130,246,0.25);
    color: #60a5fa;
  }
  .badge.blue::before { background: #60a5fa; }

  .badge.purple {
    background: rgba(168,85,247,0.1);
    border-color: rgba(168,85,247,0.25);
    color: #c084fc;
  }
  .badge.purple::before { background: #c084fc; }

  .badge.orange {
    background: rgba(249,115,22,0.1);
    border-color: rgba(249,115,22,0.25);
    color: #fb923c;
  }
  .badge.orange::before { background: #fb923c; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .title {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 600;
    color: #f1f5f9;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .title span.green  { color: #00d46e; }
  .title span.blue   { color: #60a5fa; }
  .title span.purple { color: #c084fc; }
  .title span.orange { color: #fb923c; }

  .subtitle {
    font-size: 13px;
    color: #64748b;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.02em;
  }

  .card {
    background: #111827;
    border: 1px solid #1e293b;
    border-radius: 4px;
    padding: 28px 32px;
    margin-bottom: 16px;
    position: relative;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00d46e2a, transparent);
  }

  .card.blue-accent::before {
    background: linear-gradient(90deg, transparent, #3b82f62a, transparent);
  }

  .card.purple-accent::before {
    background: linear-gradient(90deg, transparent, rgba(168,85,247,0.17), transparent);
  }

  .card.orange-accent::before {
    background: linear-gradient(90deg, transparent, rgba(249,115,22,0.17), transparent);
  }

  .card-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1e293b;
  }

  .field-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .field-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .field-full   { margin-bottom: 16px; }

  .field label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .field input[type="number"], .field input[type="text"] {
    width: 100%;
    background: #0d1520;
    border: 1px solid #1e293b;
    border-radius: 2px;
    padding: 11px 14px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
    color: #e2e8f0;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .field input:focus {
    border-color: #00d46e;
    box-shadow: 0 0 0 3px rgba(0,212,110,0.08);
  }

  .field input::placeholder { color: #2d3f55; }

  .toggle-group { display: flex; gap: 8px; }

  .toggle-btn {
    flex: 1;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid #1e293b;
    background: #0d1520;
    color: #475569;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.05em;
  }

  .toggle-btn.active {
    border-color: #00d46e;
    background: rgba(0,212,110,0.08);
    color: #00d46e;
  }

  .rate-presets { display: flex; gap: 8px; margin-bottom: 12px; }

  .rate-btn {
    flex: 1;
    padding: 10px 6px;
    border-radius: 2px;
    border: 1px solid #1e293b;
    background: #0d1520;
    color: #475569;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
    line-height: 1.5;
  }

  .rate-btn.active {
    border-color: #3b82f6;
    background: rgba(59,130,246,0.08);
    color: #60a5fa;
  }

  .rate-btn strong { display: block; font-size: 13px; }

  details summary {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #3b82f6;
    cursor: pointer;
    list-style: none;
    padding: 10px 0;
    border-top: 1px solid #1e293b;
    margin-top: 4px;
  }

  details summary::-webkit-details-marker { display: none; }
  details[open] summary { margin-bottom: 16px; }

  .error-box {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 2px;
    padding: 10px 14px;
    margin-bottom: 16px;
    color: #f87171;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  .calc-btn {
    width: 100%;
    padding: 16px;
    background: #00d46e;
    border: none;
    border-radius: 2px;
    color: #0a0e17;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }

  .calc-btn.blue-btn { background: #3b82f6; color: #fff; }
  .calc-btn:hover    { filter: brightness(1.1); }
  .calc-btn:active   { transform: scale(0.995); }

  .reset-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid #1e293b;
    border-radius: 2px;
    color: #475569;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.15s;
    letter-spacing: 0.08em;
  }

  .reset-btn:hover { border-color: #475569; color: #94a3b8; }

  .verdict {
    border-radius: 4px;
    padding: 24px 28px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 20px;
    animation: slideIn 0.35s ease;
  }

  .verdict.bullish { background: rgba(0,212,110,0.07);  border: 1px solid rgba(0,212,110,0.2);  }
  .verdict.bearish { background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.2); }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .verdict-icon  { font-size: 32px; flex-shrink: 0; }

  .verdict-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .verdict-title {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-bottom: 4px;
  }

  .verdict.bullish .verdict-title { color: #00d46e; }
  .verdict.bearish .verdict-title { color: #60a5fa; }

  .verdict-sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #64748b;
  }

  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #1a2332;
  }
  .result-row:last-child { border-bottom: none; }

  .result-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #475569;
  }

  .result-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #e2e8f0;
  }

  .result-value.green  { color: #00d46e; }
  .result-value.red    { color: #f87171; }
  .result-value.blue   { color: #60a5fa; }
  .result-value.amber  { color: #fbbf24; }
  .result-value.purple { color: #c084fc; }
  .result-value.orange { color: #fb923c; }
  .result-value.lg     { font-size: 16px; font-weight: 600; }

  .section-divider {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #2d3f55;
    text-transform: uppercase;
    margin: 18px 0 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-divider::after { content: ''; flex: 1; height: 1px; background: #1e293b; }

  .warn-box {
    background: rgba(251,191,36,0.07);
    border: 1px solid rgba(251,191,36,0.2);
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #fbbf24;
    line-height: 1.6;
    margin: 8px 0;
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

function sanitizeDecimal(raw) {
  let v = raw.replace(/,/g, ".").replace(/[^0-9.]/g, "");
  const parts = v.split(".");
  if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
  return v;
}

const Field = ({ label, value, onChange, placeholder, min, max, step = "any", integer }) => {
  function handleChange(e) {
    const raw = e.target.value;
    if (integer) {
      const clean = raw.replace(/[^0-9]/g, "");
      if (max !== undefined && clean !== "" && parseInt(clean) > parseInt(max)) {
        onChange(String(max));
      } else {
        onChange(clean);
      }
    } else {
      onChange(sanitizeDecimal(raw));
    }
  }
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="text"
        inputMode={integer ? "numeric" : "decimal"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

const ResultRow = ({ label, value, color, large }) => (
  <div className="result-row">
    <span className="result-label">{label}</span>
    <span className={`result-value${color ? ` ${color}` : ""}${large ? " lg" : ""}`}>{value}</span>
  </div>
);

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
          {tela === "comparativo" && <TelaComparativo />}
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
function TelaComparativo() {
  const [precoVista, setPrecoVista]       = useState("");
  const [parcelas, setParcelas]           = useState("");
  const [valorParcela, setValorParcela]   = useState("");
  const [investir, setInvestir]           = useState(true);
  const [taxa, setTaxa]                   = useState(0.9);
  const [diaCompra, setDiaCompra]         = useState("");
  const [diaFechamento, setDiaFechamento] = useState("");
  const [diaVencimento, setDiaVencimento] = useState("");
  const [resultado, setResultado]         = useState(null);
  const [erro, setErro]                   = useState("");

  const presets = [
    { label: "Poupança",  value: 0.5 },
    { label: "Selic/CDI", value: 0.9 },
    { label: "CDI+",      value: 1.1 },
  ];

  function calcularCarencia() {
    if (!diaCompra || !diaFechamento || !diaVencimento) return 0;
    const dc = parseInt(diaCompra), df = parseInt(diaFechamento), dv = parseInt(diaVencimento);
    const dias = dc <= df ? (dv > df ? dv - dc : 30 - dc + dv) : dv + (30 - dc);
    return Math.max(0, dias);
  }

  function calcular() {
    setErro("");
    const pv = parseFloat(precoVista);
    const n  = parseInt(parcelas);
    const vp = parseFloat(valorParcela);
    const t  = taxa / 100;

    if (!pv || pv <= 0)          return setErro("Informe o preço à vista.");
    if (!n || n < 1 || n > 360)  return setErro("Número de parcelas deve ser entre 1 e 360.");
    if (!vp || vp <= 0)          return setErro("Informe o valor de cada parcela.");

    const totalParcelado = n * vp;
    const desconto       = totalParcelado - pv;

    let taxaImplicita = 0;
    if (totalParcelado > pv) {
      let lo = 0, hi = 1;
      for (let i = 0; i < 100; i++) {
        const mid = (lo + hi) / 2;
        let soma  = 0;
        for (let k = 1; k <= n; k++) soma += vp / Math.pow(1 + mid, k);
        soma > pv ? (lo = mid) : (hi = mid);
      }
      taxaImplicita = (lo + hi) / 2;
    }

    const carenciaDias   = calcularCarencia();
    const carenciaMeses  = carenciaDias / 30;
    let rendimentoCarencia = 0, saldoFinal = 0;

    if (investir) {
      rendimentoCarencia = pv * (Math.pow(1 + t, carenciaMeses) - 1);
      let saldo = pv + rendimentoCarencia;
      for (let k = 1; k <= n; k++) saldo = saldo * (1 + t) - vp;
      saldoFinal = saldo;
    }

    const rendimentoTotal = investir ? (saldoFinal + totalParcelado - pv) : 0;
    const comparativo     = investir ? rendimentoTotal - desconto : -desconto;

    setResultado({
      totalParcelado, desconto,
      taxaImplicita: taxaImplicita * 100,
      taxaImplicitaAnual: (Math.pow(1 + taxaImplicita, 12) - 1) * 100,
      carenciaDias, rendimentoCarencia, rendimentoTotal, saldoFinal, comparativo,
      temJuros: totalParcelado > pv,
      saldoInsuficiente: investir && saldoFinal < 0,
    });
  }

  const bullish = resultado?.comparativo > 0;

  return (
    <>
      <div className="header">
        <div className="badge">SIMULADOR FINANCEIRO</div>
        <h1 className="title">À Vista ou <span className="green">Parcelado?</span></h1>
        <p className="subtitle">// análise comparativa de fluxo de caixa</p>
      </div>

      <div className="card">
        <div className="card-title">01 — dados da compra</div>
        <div className="field-grid">
          <Field label="Preço à Vista (R$)" value={precoVista} onChange={setPrecoVista} placeholder="0.00" min="0" step="0.01" />
          <Field label="Nº de Parcelas" value={parcelas} onChange={setParcelas} placeholder="1 – 360" min="1" max="360" step="1" integer />
        </div>
        <div className="field-full">
          <Field label="Valor de cada Parcela (R$)" value={valorParcela} onChange={setValorParcela} placeholder="0.00" min="0" step="0.01" />
        </div>
      </div>

      <div className="card">
        <div className="card-title">02 — estratégia de capital</div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label>Vai investir o valor à vista?</label>
          <div className="toggle-group">
            {[true, false].map((opt) => (
              <button key={String(opt)} className={`toggle-btn${investir === opt ? " active" : ""}`} onClick={() => setInvestir(opt)}>
                {opt ? "▲  SIM, VOU INVESTIR" : "▼  NÃO VOU INVESTIR"}
              </button>
            ))}
          </div>
        </div>

        {investir && (
          <>
            <div className="field" style={{ marginBottom: 12 }}>
              <label>Benchmark de rendimento</label>
              <div className="rate-presets">
                {presets.map((p) => (
                  <button key={p.value} className={`rate-btn${taxa === p.value ? " active" : ""}`} onClick={() => setTaxa(p.value)}>
                    {p.label}<strong>{p.value}% a.m.</strong>
                  </button>
                ))}
              </div>
            </div>
            <Field label="Taxa mensal personalizada (%)" value={taxa} onChange={setTaxa} placeholder="0.90" min="0" step="0.01" />
          </>
        )}

        <details>
          <summary>▸ CICLO DO CARTÃO (OPCIONAL)</summary>
          <div className="field-grid-3">
            <Field label="Dia da Compra"  value={diaCompra}      onChange={setDiaCompra}      placeholder="1-31" min="1" max="31" step="1" integer />
            <Field label="Fechamento"     value={diaFechamento}  onChange={setDiaFechamento}  placeholder="1-31" min="1" max="31" step="1" integer />
            <Field label="Vencimento"     value={diaVencimento}  onChange={setDiaVencimento}  placeholder="1-31" min="1" max="31" step="1" integer />
          </div>
        </details>
      </div>

      {erro && <div className="error-box">⚠ {erro}</div>}

      <button className="calc-btn" onClick={calcular}>EXECUTAR ANÁLISE →</button>

      {resultado && (
        <div style={{ marginTop: 24 }}>
          <div className={`verdict ${bullish ? "bullish" : "bearish"}`}>
            <div className="verdict-icon">{bullish ? "📈" : "🏦"}</div>
            <div>
              <div className="verdict-label">resultado da análise</div>
              <div className="verdict-title">{bullish ? "Parcelado é mais vantajoso" : "À vista é mais vantajoso"}</div>
              <div className="verdict-sub">
                {bullish
                  ? `ganho líquido de ${fmt(Math.abs(resultado.comparativo))} investindo o capital`
                  : `economia de ${fmt(Math.abs(resultado.desconto))} no pagamento imediato`}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">resumo operacional</div>
            <ResultRow label="Preço à vista"                    value={fmt(parseFloat(precoVista))} />
            <ResultRow label="Total parcelado"                  value={fmt(resultado.totalParcelado)} />
            <ResultRow label="Diferença bruta (desconto à vista)" value={fmt(resultado.desconto)} color={resultado.desconto > 0 ? "green" : "red"} />
            {investir && <>
              <ResultRow label="Carência (dias até 1ª parcela)" value={`${resultado.carenciaDias} dias`} />
              <ResultRow label="Rendimento na carência"         value={fmt(resultado.rendimentoCarencia)} color="green" />
              <ResultRow label="Rendimento total no período"    value={fmt(resultado.rendimentoTotal)} color={resultado.rendimentoTotal >= 0 ? "green" : "red"} large />
              {resultado.saldoInsuficiente && (
                <div className="warn-box">⚠ O rendimento não cobre todas as parcelas — será necessário aportar capital adicional ao longo do período.</div>
              )}
            </>}

            <div className="section-divider">análise avançada</div>

            <ResultRow label="Juros no parcelamento?"           value={resultado.temJuros ? "SIM" : "NÃO"} color={resultado.temJuros ? "red" : "green"} />
            {resultado.temJuros && <>
              <ResultRow label="Taxa implícita (a.m.)"          value={fmtPct(resultado.taxaImplicita)} color="red" />
              <ResultRow label="Taxa implícita (a.a.)"          value={fmtPct(resultado.taxaImplicitaAnual)} color="red" />
            </>}
            {investir && <ResultRow label="Saldo após quitação das parcelas" value={fmt(resultado.saldoFinal)} color={resultado.saldoFinal > 0 ? "green" : "red"} />}
            <ResultRow label="Comparativo final" value={fmt(resultado.comparativo)} color={resultado.comparativo > 0 ? "green" : "blue"} large />

            <button className="reset-btn" onClick={() => setResultado(null)}>↩ NOVA SIMULAÇÃO</button>
          </div>
        </div>
      )}
    </>
  );
}
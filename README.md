# FINLAB — Calculadora Financeira

Projeto acadêmico de simulação financeira desenvolvido com React + Vite. Permite comparar estratégias de compra, projetar investimentos e analisar financiamentos de forma interativa.

> ⚠️ Fins exclusivamente educacionais. Não constitui recomendação de investimento.

---

## Funcionalidades

- **À Vista ou Parcelado** — compara o custo real do parcelamento com o rendimento do capital investido, calculando taxa implícita e ciclo do cartão
- **Simulador de Investimentos** — projeta patrimônio com aportes mensais e calcula o prazo para atingir objetivos (carro, casa, outros)
- **SAC ou Price** — gera a tabela de amortização completa e compara os dois sistemas de financiamento
- **Consórcio vs Financiamento vs Poupar** — rankeia as três estratégias de aquisição pelo custo total real, incluindo custo de oportunidade

---

## Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)

---

## Como rodar

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/finlab.git
cd finlab

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

---

## Estrutura do projeto

```
finlab/
├── public/
├── src/
│   ├── assets/
│   ├── App.css       # estilos do template Vite
│   ├── App.jsx       # toda a lógica e UI da aplicação
│   ├── index.css     # variáveis CSS, reset e layout global
│   └── main.jsx      # entry point React
├── index.html
├── vite.config.js
└── package.json
```

---

## Desenvolvimento

O projeto será desenvolvido em **5 sprints de 2 semanas**, cada uma entregando uma fatia funcional seguindo o planejamento:

| Sprint | Branch | Entrega |
|--------|--------|---------|
| 1 | `feature/setup-base` | Estrutura base + tela À Vista ou Parcelado |
| 2 | `feature/investimentos` | Simulador de Investimentos + captura de leads |
| 3 | `feature/financiamento-sac-price` | Tela SAC ou Price |
| 4 | `feature/consorcio-comparador` | Consórcio vs Financiamento vs Poupar |
| 5 | `feature/polish-final` | Responsividade, animações e ajustes finais |

---

## Autores

Projeto desenvolvido para fins acadêmicos.

- Enzo Yamaoca Borlini — 236774
- Henrique Bicudo Paulino da Silva — 235198
- Lucas Marino Tomazeli — 235198
/** @type {import('tailwindcss').Config} */
// import fvfevfev from './src/images/foto_fundo.svg'

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFmily: {
      sans: 'Lexend Deca, sans-serif',
    },
    extend: {
      backgroundImage: {
        'bg-login': 'url(\'https://static.vecteezy.com/ti/vetor-gratis/p1/5922886-resumo-digital-bitcoin-financiamento-no-mundo-on-line-por-transacoes-de-internet-movel-em-sistemas-on-line-em-fundo-internet-negociacao-de-acoes-conectado-tudo-sobre-o-mundo-vetor.jpg\')',
      },
    },
  },
  plugins: [],
};

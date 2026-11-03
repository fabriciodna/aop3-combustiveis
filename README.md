# Preços de combustíveis em Vila Velha (ES)

Projeto acadêmico que desenvolvi para consultar e comparar preços de combustíveis coletados em postos de Vila Velha. Usei **HTML, CSS e JavaScript** para transformar os registros em consultas, gráficos e uma opção de exportação para Excel.

Os dados são uma amostra histórica de **2026**. **Não são preços em tempo real** e não representam todos os postos da cidade.

## O que dá para consultar

- Menor e maior preço por tipo de combustível, com filtros.
- Média de preço por posto e combustível.
- Registro mais recente de cada combinação **dentro da amostra**.
- Histórico de preços por posto, com gráficos de evolução.
- Exportação das coletas para uma planilha Excel.

A parte mais interessante do trabalho foi partir de uma lista de registros e criar diferentes maneiras de enxergar os mesmos dados, sem precisar montar uma tabela manualmente para cada consulta.

## Sobre os dados

O arquivo `dados.js` contém **25 coletas de cinco postos**, com quatro tipos de combustível em cada coleta — **100 registros de preço** no total.

Foram considerados gasolina, gasolina aditivada, etanol e diesel S10. As datas registradas vão de janeiro a julho de 2026.

## Tecnologias

**HTML5 · CSS3 · JavaScript · Chart.js · SheetJS (XLSX)**

O JavaScript organiza os filtros, calcula médias, atualiza as tabelas e prepara os dados usados pelos gráficos e pela exportação.

## Como executar

Clone o projeto:

```bash
git clone https://github.com/fabriciodna/aop3-combustiveis.git
```

Abra `index.html` no navegador. É necessário estar conectado à internet para carregar as bibliotecas Chart.js e SheetJS utilizadas via CDN.

A aplicação é **estática**: os dados vêm de `dados.js`, sem API ou banco de dados ativo neste repositório.

## Arquivos

- `index.html` — estrutura da página e das consultas.
- `style.css` — aparência da interface.
- `dados.js` — registros históricos utilizados.
- `script.js` — filtros, cálculos, gráficos e exportação.

---

Projeto acadêmico de [Fabrício Dantas](https://github.com/fabriciodna).

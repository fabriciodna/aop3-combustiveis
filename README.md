# Análise de preços de combustíveis — Vila Velha/ES

Projeto acadêmico de visualização e análise de preços de combustíveis, desenvolvido com **HTML, CSS e JavaScript**.

A aplicação reúne registros históricos de cinco postos de Vila Velha (ES) e permite comparar preços por combustível, consultar médias e acompanhar a evolução dos valores em gráficos.

> **Importante:** os dados são um recorte de pesquisa de 2026, armazenado localmente em `dados.js`. Este projeto **não** consulta preços em tempo real e não deve ser usado como cotação atual de postos.

## Funcionalidades

- Consulta dos menores e maiores preços por tipo de combustível, com filtros.
- Média de preços por posto e combustível.
- Exibição do registro mais recente de cada posto e combustível **dentro da amostra**.
- Histórico de preços filtrado por posto e combustível.
- Gráficos de evolução e médias usando **Chart.js**.
- Exportação dos registros para **Excel (.xlsx)** usando SheetJS.

## Dados da pesquisa

| Indicador | Quantidade |
| --- | ---: |
| Postos analisados | 5 |
| Coletas por posto | 5 |
| Coletas no total | 25 |
| Tipos de combustível | 4 |
| Registros de preços | 100 |

Combustíveis contemplados: **gasolina, gasolina aditivada, etanol e diesel S10**. As datas dos registros vão de **janeiro a julho de 2026**, conforme o arquivo `dados.js`.

## Tecnologias

- **HTML5:** estrutura e elementos de consulta.
- **CSS3:** estilos da interface.
- **JavaScript (vanilla):** filtros, cálculos, manipulação do DOM e formatação.
- **Chart.js:** gráficos.
- **SheetJS (XLSX):** exportação para planilhas.

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/fabriciodna/aop3-combustiveis.git
   ```
2. Abra o arquivo `index.html` no navegador.
3. Mantenha a conexão com a internet para carregar as bibliotecas Chart.js e SheetJS utilizadas via CDN.

Não é necessário instalar Node.js ou iniciar um servidor de backend para a visualização básica.

## Estrutura

```text
├── index.html   # Interface e seções das consultas
├── style.css    # Estilização
├── dados.js     # Coletas históricas da pesquisa
└── script.js    # Consultas, filtros, gráficos e exportação
```

## Limitações e contexto

A versão publicada é uma **aplicação front-end estática**. Os registros são carregados de um arquivo JavaScript, sem banco de dados ou API ativa neste repositório. Os resultados dependem apenas da amostra coletada; não representam todos os estabelecimentos nem os preços atuais da cidade.

## Autor

**Fabrício Dantas** — [GitHub](https://github.com/fabriciodna)

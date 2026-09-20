const tabelaConsulta1 = document.getElementById("tabela-consulta1");
const tabelaConsulta2 = document.getElementById("tabela-consulta2");
const tabelaConsulta3 = document.getElementById("tabela-consulta3");
const tabelaConsulta4 = document.getElementById("tabela-consulta4");
const filtroCombustivelConsulta1 = document.getElementById("filtro-combustivel-consulta1");
const filtroTipoConsulta1 = document.getElementById("filtro-tipo-consulta1");
const resumoConsulta1 = document.getElementById("resumo-consulta1");
const selectPostoHistorico = document.getElementById("posto-historico");
const selectCombustivelHistorico = document.getElementById("combustivel-historico");
const selectPostoGrafico = document.getElementById("posto-grafico");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function converterData(data) {
    const [dia, mes, ano] = data.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
}

function calcularMedia(registros) {
    return registros.reduce((total, preco) => total + preco.valor, 0) / registros.length;
}

function obterMes(data) {
    const partes = data.split("/");
    return partes[2] + "-" + partes[1];
}

function formatarMes(mes) {
    const partes = mes.split("-");
    return partes[1] + "/" + partes[0];
}

const postos = [...new Set(precos.map(preco => preco.posto))];
const combustiveis = [...new Set(precos.map(preco => preco.combustivel))];
const coletas = new Set(precos.map(preco => preco.posto + "-" + preco.data));

document.getElementById("total-postos").textContent = postos.length;
document.getElementById("total-coletas").textContent = coletas.size;
document.getElementById("total-combustiveis").textContent = combustiveis.length;
document.getElementById("total-precos").textContent = precos.length;

function preencherSelects() {
    combustiveis.forEach(combustivel => {
        const opcaoConsulta = document.createElement("option");
        opcaoConsulta.value = combustivel;
        opcaoConsulta.textContent = combustivel;
        filtroCombustivelConsulta1.appendChild(opcaoConsulta);

        const opcaoHistorico = document.createElement("option");
        opcaoHistorico.value = combustivel;
        opcaoHistorico.textContent = combustivel;
        selectCombustivelHistorico.appendChild(opcaoHistorico);
    });

    postos.forEach(posto => {
        const opcaoHistorico = document.createElement("option");
        opcaoHistorico.value = posto;
        opcaoHistorico.textContent = posto;
        selectPostoHistorico.appendChild(opcaoHistorico);

        const opcaoGrafico = document.createElement("option");
        opcaoGrafico.value = posto;
        opcaoGrafico.textContent = posto;
        selectPostoGrafico.appendChild(opcaoGrafico);
    });
}

function adicionarLinhaConsulta1(preco, tipo) {
    const linha = document.createElement("tr");
    linha.innerHTML =
        "<td>" + preco.combustivel + "</td>" +
        "<td>" + tipo + "</td>" +
        "<td>" + preco.posto + "</td>" +
        "<td>" + formatarPreco(preco.valor) + "</td>" +
        "<td>" + preco.data + "</td>";
    tabelaConsulta1.appendChild(linha);
}

function gerarConsulta1() {
    tabelaConsulta1.innerHTML = "";
    const combustivelSelecionado = filtroCombustivelConsulta1.value;
    const tipoSelecionado = filtroTipoConsulta1.value;
    const lista = combustivelSelecionado === "todos" ? combustiveis : [combustivelSelecionado];
    let totalResultados = 0;

    lista.forEach(combustivel => {
        const registros = precos.filter(preco => preco.combustivel === combustivel);
        const valores = registros.map(preco => preco.valor);
        const menor = Math.min(...valores);
        const maior = Math.max(...valores);

        if (tipoSelecionado === "todos" || tipoSelecionado === "menor") {
            registros.filter(preco => preco.valor === menor).forEach(preco => {
                adicionarLinhaConsulta1(preco, "Menor");
                totalResultados++;
            });
        }

        if (tipoSelecionado === "todos" || tipoSelecionado === "maior") {
            registros.filter(preco => preco.valor === maior).forEach(preco => {
                adicionarLinhaConsulta1(preco, "Maior");
                totalResultados++;
            });
        }
    });

    const nomeCombustivel = combustivelSelecionado === "todos"
        ? "todos os combustíveis"
        : combustivelSelecionado;

    const tipoTexto = tipoSelecionado === "menor"
        ? "menores preços"
        : tipoSelecionado === "maior"
            ? "maiores preços"
            : "menores e maiores preços";

    resumoConsulta1.textContent =
        "Exibindo " + totalResultados + " resultado(s) de " + tipoTexto + " para " + nomeCombustivel + ".";
}

function mostrarTodosConsulta1() {
    filtroCombustivelConsulta1.value = "todos";
    filtroTipoConsulta1.value = "todos";
    gerarConsulta1();
}

function gerarConsulta2() {
    tabelaConsulta2.innerHTML = "";
    postos.forEach(posto => {
        combustiveis.forEach(combustivel => {
            const registros = precos.filter(preco =>
                preco.posto === posto && preco.combustivel === combustivel
            );
            if (!registros.length) return;

            const linha = document.createElement("tr");
            linha.innerHTML =
                "<td>" + posto + "</td>" +
                "<td>" + combustivel + "</td>" +
                "<td>" + formatarPreco(calcularMedia(registros)) + "</td>" +
                "<td>" + registros.length + "</td>";
            tabelaConsulta2.appendChild(linha);
        });
    });
}

function gerarConsulta3() {
    tabelaConsulta3.innerHTML = "";
    postos.forEach(posto => {
        combustiveis.forEach(combustivel => {
            const registros = precos
                .filter(preco => preco.posto === posto && preco.combustivel === combustivel)
                .sort((a, b) => converterData(b.data) - converterData(a.data));

            if (!registros.length) return;
            const maisRecente = registros[0];
            const linha = document.createElement("tr");
            linha.innerHTML =
                "<td>" + maisRecente.posto + "</td>" +
                "<td>" + maisRecente.combustivel + "</td>" +
                "<td>" + formatarPreco(maisRecente.valor) + "</td>" +
                "<td>" + maisRecente.data + "</td>";
            tabelaConsulta3.appendChild(linha);
        });
    });
}

let graficoHistorico;
function gerarConsulta4() {
    const posto = selectPostoHistorico.value;
    const combustivel = selectCombustivelHistorico.value;
    const registros = precos
        .filter(preco => preco.posto === posto && preco.combustivel === combustivel)
        .sort((a, b) => converterData(a.data) - converterData(b.data));

    tabelaConsulta4.innerHTML = "";
    registros.forEach(preco => {
        const linha = document.createElement("tr");
        linha.innerHTML = "<td>" + preco.data + "</td><td>" + formatarPreco(preco.valor) + "</td>";
        tabelaConsulta4.appendChild(linha);
    });

    const contexto = document.getElementById("grafico-historico");
    if (graficoHistorico) graficoHistorico.destroy();
    graficoHistorico = new Chart(contexto, {
        type: "line",
        data: {
            labels: registros.map(preco => preco.data),
            datasets: [{
                label: combustivel + " - " + posto,
                data: registros.map(preco => preco.valor),
                borderWidth: 2,
                tension: 0.2
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

let graficoMedias;
function gerarGraficoMedias() {
    const meses = [...new Set(precos.map(preco => obterMes(preco.data)))].sort();
    const conjuntos = combustiveis.map(combustivel => ({
        label: combustivel,
        data: meses.map(mes => {
            const registros = precos.filter(preco =>
                preco.combustivel === combustivel && obterMes(preco.data) === mes
            );
            return registros.length ? calcularMedia(registros) : null;
        }),
        borderWidth: 2,
        tension: 0.2
    }));

    if (graficoMedias) graficoMedias.destroy();
    graficoMedias = new Chart(document.getElementById("grafico-medias"), {
        type: "line",
        data: { labels: meses.map(formatarMes), datasets: conjuntos },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

let graficoPosto;
function gerarGraficoPosto() {
    const posto = selectPostoGrafico.value;
    const dadosPosto = precos.filter(preco => preco.posto === posto);
    const meses = [...new Set(dadosPosto.map(preco => obterMes(preco.data)))].sort();
    const conjuntos = combustiveis.map(combustivel => ({
        label: combustivel,
        data: meses.map(mes => {
            const registros = dadosPosto.filter(preco =>
                preco.combustivel === combustivel && obterMes(preco.data) === mes
            );
            return registros.length ? calcularMedia(registros) : null;
        }),
        borderWidth: 2,
        tension: 0.2
    }));

    if (graficoPosto) graficoPosto.destroy();
    graficoPosto = new Chart(document.getElementById("grafico-posto"), {
        type: "line",
        data: { labels: meses.map(formatarMes), datasets: conjuntos },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function baixarExcel() {
    const dados = precos.map(preco => {
        const [dia, mes, ano] = preco.data.split("/").map(Number);
        return {
            Posto: preco.posto,
            Combustível: preco.combustivel,
            Valor: preco.valor,
            Data: new Date(ano, mes - 1, dia)
        };
    });

    const planilha = XLSX.utils.json_to_sheet(dados);
    planilha["!cols"] = [{ wch: 38 }, { wch: 22 }, { wch: 14 }, { wch: 14 }];

    for (let linha = 2; linha <= precos.length + 1; linha++) {
        if (planilha["C" + linha]) planilha["C" + linha].z = 'R$ #,##0.00';
        if (planilha["D" + linha]) planilha["D" + linha].z = "dd/mm/yyyy";
    }

    const arquivo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(arquivo, planilha, "Preços");
    XLSX.writeFile(arquivo, "precos-combustiveis.xlsx");
}

document.getElementById("consultar-consulta1").addEventListener("click", gerarConsulta1);
document.getElementById("limpar-consulta1").addEventListener("click", mostrarTodosConsulta1);
selectPostoHistorico.addEventListener("change", gerarConsulta4);
selectCombustivelHistorico.addEventListener("change", gerarConsulta4);
selectPostoGrafico.addEventListener("change", gerarGraficoPosto);
document.getElementById("baixar-dados").addEventListener("click", baixarExcel);

preencherSelects();
gerarConsulta1();
gerarConsulta2();
gerarConsulta3();
gerarConsulta4();
gerarGraficoMedias();
gerarGraficoPosto();

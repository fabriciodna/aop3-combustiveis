

const tabelaConsulta1 =
    document.getElementById("tabela-consulta1");

const tabelaConsulta2 =
    document.getElementById("tabela-consulta2");

const tabelaConsulta3 =
    document.getElementById("tabela-consulta3");

const tabelaConsulta4 =
    document.getElementById("tabela-consulta4");


const selectPostoHistorico =
    document.getElementById("posto-historico");

const selectCombustivelHistorico =
    document.getElementById("combustivel-historico");

const selectPostoGrafico =
    document.getElementById("posto-grafico");





function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


function converterData(data) {

    const partes = data.split("/");

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    return new Date(
        ano,
        mes - 1,
        dia
    );
}


function calcularMedia(registros) {

    const soma = registros.reduce(
        function(total, preco) {

            return total + preco.valor;

        },
        0
    );

    return soma / registros.length;
}



/* =========================================
   LISTAS AUTOMÁTICAS
========================================= */

const postos = [
    ...new Set(
        precos.map(
            function(preco) {
                return preco.posto;
            }
        )
    )
];


const combustiveis = [
    ...new Set(
        precos.map(
            function(preco) {
                return preco.combustivel;
            }
        )
    )
];





const coletas = new Set(

    precos.map(
        function(preco) {

            return preco.posto
                + "-"
                + preco.data;
        }
    )
);


document.getElementById(
    "total-postos"
).textContent = postos.length;


document.getElementById(
    "total-coletas"
).textContent = coletas.size;


document.getElementById(
    "total-combustiveis"
).textContent = combustiveis.length;


document.getElementById(
    "total-precos"
).textContent = precos.length;



/* =========================================
   CONSULTA 1
   MENOR E MAIOR PREÇO
========================================= */

function gerarConsulta1() {

    tabelaConsulta1.innerHTML = "";


    combustiveis.forEach(
        function(combustivel) {

            const registros =
                precos.filter(
                    function(preco) {

                        return preco.combustivel
                            === combustivel;
                    }
                );


            const valores =
                registros.map(
                    function(preco) {
                        return preco.valor;
                    }
                );


            const menor =
                Math.min(...valores);

            const maior =
                Math.max(...valores);



            const menores =
                registros.filter(
                    function(preco) {

                        return preco.valor
                            === menor;
                    }
                );


            menores.forEach(
                function(preco) {

                    adicionarLinhaConsulta1(
                        preco,
                        "Menor"
                    );
                }
            );



            const maiores =
                registros.filter(
                    function(preco) {

                        return preco.valor
                            === maior;
                    }
                );


            maiores.forEach(
                function(preco) {

                    adicionarLinhaConsulta1(
                        preco,
                        "Maior"
                    );
                }
            );
        }
    );
}



function adicionarLinhaConsulta1(
    preco,
    tipo
) {

    const linha =
        document.createElement("tr");


    linha.innerHTML = `

        <td>${preco.combustivel}</td>

        <td>${tipo}</td>

        <td>${preco.posto}</td>

        <td>
            ${formatarPreco(preco.valor)}
        </td>

        <td>${preco.data}</td>

    `;


    tabelaConsulta1.appendChild(linha);
}



/* =========================================
   CONSULTA 2
   PREÇO MÉDIO
========================================= */

function gerarConsulta2() {

    tabelaConsulta2.innerHTML = "";


    postos.forEach(
        function(posto) {

            combustiveis.forEach(
                function(combustivel) {

                    const registros =
                        precos.filter(
                            function(preco) {

                                return (
                                    preco.posto
                                        === posto
                                    &&
                                    preco.combustivel
                                        === combustivel
                                );
                            }
                        );


                    if (registros.length === 0) {
                        return;
                    }


                    const media =
                        calcularMedia(registros);


                    const linha =
                        document.createElement("tr");


                    linha.innerHTML = `

                        <td>
                            ${posto}
                        </td>

                        <td>
                            ${combustivel}
                        </td>

                        <td>
                            ${formatarPreco(media)}
                        </td>

                        <td>
                            ${registros.length}
                        </td>

                    `;


                    tabelaConsulta2.appendChild(
                        linha
                    );
                }
            );
        }
    );
}



/* =========================================
   CONSULTA 3
   PREÇO MAIS RECENTE
========================================= */

function gerarConsulta3() {

    tabelaConsulta3.innerHTML = "";


    postos.forEach(
        function(posto) {

            combustiveis.forEach(
                function(combustivel) {

                    const registros =
                        precos.filter(
                            function(preco) {

                                return (
                                    preco.posto
                                        === posto
                                    &&
                                    preco.combustivel
                                        === combustivel
                                );
                            }
                        );


                    registros.sort(
                        function(a, b) {

                            return (
                                converterData(b.data)
                                -
                                converterData(a.data)
                            );
                        }
                    );


                    const maisRecente =
                        registros[0];


                    const linha =
                        document.createElement("tr");


                    linha.innerHTML = `

                        <td>
                            ${maisRecente.posto}
                        </td>

                        <td>
                            ${maisRecente.combustivel}
                        </td>

                        <td>
                            ${formatarPreco(
                                maisRecente.valor
                            )}
                        </td>

                        <td>
                            ${maisRecente.data}
                        </td>

                    `;


                    tabelaConsulta3.appendChild(
                        linha
                    );
                }
            );
        }
    );
}



/* =========================================
   PREENCHER SELECTS
========================================= */

function preencherSelects() {

    postos.forEach(
        function(posto) {

            const opcao1 =
                document.createElement("option");

            opcao1.value = posto;

            opcao1.textContent = posto;

            selectPostoHistorico.appendChild(
                opcao1
            );


            const opcao2 =
                document.createElement("option");

            opcao2.value = posto;

            opcao2.textContent = posto;

            selectPostoGrafico.appendChild(
                opcao2
            );
        }
    );


    combustiveis.forEach(
        function(combustivel) {

            const opcao =
                document.createElement("option");

            opcao.value =
                combustivel;

            opcao.textContent =
                combustivel;

            selectCombustivelHistorico
                .appendChild(opcao);
        }
    );
}



/* =========================================
   CONSULTA 4
   HISTÓRICO
========================================= */

let graficoHistorico;


function gerarConsulta4() {

    const posto =
        selectPostoHistorico.value;

    const combustivel =
        selectCombustivelHistorico.value;


    const registros =
        precos.filter(
            function(preco) {

                return (
                    preco.posto === posto
                    &&
                    preco.combustivel
                        === combustivel
                );
            }
        );


    registros.sort(
        function(a, b) {

            return (
                converterData(a.data)
                -
                converterData(b.data)
            );
        }
    );


    tabelaConsulta4.innerHTML = "";


    registros.forEach(
        function(preco) {

            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>
                    ${preco.data}
                </td>

                <td>
                    ${formatarPreco(
                        preco.valor
                    )}
                </td>

            `;


            tabelaConsulta4.appendChild(
                linha
            );
        }
    );


    gerarGraficoHistorico(
        registros,
        posto,
        combustivel
    );
}



/* =========================================
   GRÁFICO DO HISTÓRICO
========================================= */

function gerarGraficoHistorico(
    registros,
    posto,
    combustivel
) {

    const contexto =
        document.getElementById(
            "grafico-historico"
        );


    if (graficoHistorico) {
        graficoHistorico.destroy();
    }


    graficoHistorico =
        new Chart(
            contexto,
            {

                type: "line",

                data: {

                    labels:
                        registros.map(
                            function(preco) {
                                return preco.data;
                            }
                        ),

                    datasets: [

                        {
                            label:
                                combustivel
                                + " - "
                                + posto,

                            data:
                                registros.map(
                                    function(preco) {
                                        return preco.valor;
                                    }
                                ),

                            borderWidth: 2,

                            tension: 0.2
                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );
}



/* =========================================
   MÉDIA MENSAL
========================================= */

function obterMes(data) {

    const partes =
        data.split("/");

    return (
        partes[2]
        + "-"
        + partes[1]
    );
}


function formatarMes(mes) {

    const partes =
        mes.split("-");

    return (
        partes[1]
        + "/"
        + partes[0]
    );
}



/* =========================================
   GRÁFICO MÉDIO GERAL
========================================= */

let graficoMedias;


function gerarGraficoMedias() {

    const meses = [
        ...new Set(
            precos.map(
                function(preco) {

                    return obterMes(
                        preco.data
                    );
                }
            )
        )
    ];


    meses.sort();


    const conjuntos =
        combustiveis.map(
            function(combustivel) {

                const valores =
                    meses.map(
                        function(mes) {

                            const registros =
                                precos.filter(
                                    function(preco) {

                                        return (
                                            preco.combustivel
                                                === combustivel
                                            &&
                                            obterMes(
                                                preco.data
                                            )
                                                === mes
                                        );
                                    }
                                );


                            if (
                                registros.length
                                === 0
                            ) {

                                return null;
                            }


                            return calcularMedia(
                                registros
                            );
                        }
                    );


                return {

                    label:
                        combustivel,

                    data:
                        valores,

                    borderWidth: 2,

                    tension: 0.2

                };
            }
        );


    const contexto =
        document.getElementById(
            "grafico-medias"
        );


    graficoMedias =
        new Chart(
            contexto,
            {

                type: "line",

                data: {

                    labels:
                        meses.map(
                            formatarMes
                        ),

                    datasets:
                        conjuntos

                },


                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );
}



/* =========================================
   GRÁFICO POR POSTO
========================================= */

let graficoPosto;


function gerarGraficoPosto() {

    const posto =
        selectPostoGrafico.value;


    const dadosPosto =
        precos.filter(
            function(preco) {

                return preco.posto
                    === posto;
            }
        );


    const meses = [
        ...new Set(
            dadosPosto.map(
                function(preco) {

                    return obterMes(
                        preco.data
                    );
                }
            )
        )
    ];


    meses.sort();


    const conjuntos =
        combustiveis.map(
            function(combustivel) {

                const valores =
                    meses.map(
                        function(mes) {

                            const registros =
                                dadosPosto.filter(
                                    function(preco) {

                                        return (
                                            preco.combustivel
                                                === combustivel
                                            &&
                                            obterMes(
                                                preco.data
                                            )
                                                === mes
                                        );
                                    }
                                );


                            if (
                                registros.length
                                === 0
                            ) {

                                return null;
                            }


                            return calcularMedia(
                                registros
                            );
                        }
                    );


                return {

                    label:
                        combustivel,

                    data:
                        valores,

                    borderWidth: 2,

                    tension: 0.2

                };
            }
        );


    const contexto =
        document.getElementById(
            "grafico-posto"
        );


    if (graficoPosto) {
        graficoPosto.destroy();
    }


    graficoPosto =
        new Chart(
            contexto,
            {

                type: "line",

                data: {

                    labels:
                        meses.map(
                            formatarMes
                        ),

                    datasets:
                        conjuntos

                },


                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );
}



/* =========================================
   EXPORTAR CSV
========================================= */

function baixarExcel() {

    const dados = precos.map(function(preco) {

        const partesData = preco.data.split("/");

        const dataExcel = new Date(
            Number(partesData[2]),
            Number(partesData[1]) - 1,
            Number(partesData[0])
        );

        return {
            Posto: preco.posto,
            Combustível: preco.combustivel,
            Valor: preco.valor,
            Data: dataExcel
        };
    });


    const planilha =
        XLSX.utils.json_to_sheet(dados);


    planilha["!cols"] = [
        { wch: 38 },
        { wch: 22 },
        { wch: 12 },
        { wch: 14 }
    ];


    for (let linha = 2; linha <= precos.length + 1; linha++) {

        const celulaValor = planilha["C" + linha];

        if (celulaValor) {
            celulaValor.z = 'R$ #,##0.00';
        }


        const celulaData = planilha["D" + linha];

        if (celulaData) {
            celulaData.z = "dd/mm/yyyy";
        }
    }


    const arquivo =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        arquivo,
        planilha,
        "Preços"
    );


    XLSX.writeFile(
        arquivo,
        "precos-combustiveis.xlsx"
    );
}



/* =========================================
   EVENTOS
========================================= */

selectPostoHistorico.addEventListener(
    "change",
    gerarConsulta4
);


selectCombustivelHistorico.addEventListener(
    "change",
    gerarConsulta4
);


selectPostoGrafico.addEventListener(
    "change",
    gerarGraficoPosto
);


document.getElementById(
    "baixar-dados"
).addEventListener(
    "click",
    baixarExcel
);



/* =========================================
   INICIALIZAÇÃO DO SITE
========================================= */

gerarConsulta1();

gerarConsulta2();

gerarConsulta3();

preencherSelects();

gerarConsulta4();

gerarGraficoMedias();

gerarGraficoPosto();
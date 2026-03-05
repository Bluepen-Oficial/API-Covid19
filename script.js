// Criando variaveis
const situacao = document.querySelector("#resultadoConexao")
const InformarData = document.querySelector("#receberData")
const btnData = document.querySelector("#btnData")

// Criando variaveis do menu superior
const rankEstados = document.querySelector("#rankEstados");
const estadosIsolados = document.querySelector("#estadosIsolados");
const casosAmerica = document.querySelector("#casosAmerica");
const paisesIsolados = document.querySelector("#paisesIsolados");

// Criando variaveis Rank Estados
const erroRank = document.querySelector("#erroRank");
const btnCasos = document.querySelector("#btnCasos");
const btnMortes = document.querySelector("#btnMortes");
let siglaEstados = [];
let armazenarCasos = [];
let armazenarMortes = [];

btnCasos.addEventListener('click', () => { casosPorTodoEstado('Casos') });
// btnMortes.addEventListener('click', () => { casosPorTodoEstado('Mortes') });
// btnData.addEventListener('click', () => {
//     // console.log(InformarData.value.replace(/-/g, ""));
//     // casosPorData(InformarData.value.replace(/-/g, ""))
//     limparGrafico(graficoBarras);
// });

rankEstados.addEventListener('click', () => {

});

function mostrarSituacao() {
    fetch("https://covid19-brazil-api.now.sh/api/status/v1", {
        "method": "GET"
    })
        .then(res => res.json())
        .then(dados => {
            const validarStatus = dados.status

            if (validarStatus == "ok") {
                situacao.innerHTML = "ONLINE";
                situacao.style.color = "#18eb18";
            }
        })
        .catch(err => console.error(err));
}

function casosPorTodoEstado(busca) {
    fetch("https://covid19-brazil-api.vercel.app/api/report/v1")
        .then(res => res.json())
        .then(dados => {
            const casosPorEstado = dados;

            console.log(`${casosPorEstado.data[0].uf}: ${casosPorEstado.data[0].cases} casos, ${casosPorEstado.data[0].deaths} mortes.`);
            console.log(casosPorEstado.data.length)
            console.log(casosPorEstado);

            for (let i = 0; i < casosPorEstado.data.length; i++) {
                console.log(`Entrou no for `);
                siglaEstados.push(casosPorEstado.data[i].uf);
                armazenarCasos.push(casosPorEstado.data[i].cases);
                armazenarMortes.push(casosPorEstado.data[i].deaths);
            }

            console.log(`A > ${busca}, ${siglaEstados}, ${armazenarCasos}}`);


            busca == 'Casos' ? exibirGrafico(busca, siglaEstados, armazenarCasos) : exibirGrafico(busca, siglaEstados, armazenarMortes);

        })
        .catch(() => {
            erroRank.innerHTML = 'Dados não encontrados!'
        });
}

function casosPorData(data) {
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${data}`)
        .then(res => res.json())
        .then(dados => {
            const casosPorData = dados.data
            console.log(casosPorData)
        })
}


function exibirGrafico(busca, siglas, dados) {
    console.log(`B > ${busca}, ${siglas}, ${dados}}`);
    
    const graficoEstados = document.querySelector("#myChart");
    
    graficoBarras = new Chart(graficoEstados, {
        type: 'bar',
        data: {
            labels: siglas,
            datasets: [{
                label: `Quantidade de ${busca}`,
                data: dados,
                bordeWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    responsive: true
                }
            }
        }
    });
    
    graficoBarras.update();
}

function limparGrafico(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((datasets) => {
        datasets.data = [];
    });
    chart.update();
}

mostrarSituacao()
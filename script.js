const situacao = document.querySelector("#resultadoConexao")
const InformarData = document.querySelector("#receberData")
const btnData = document.querySelector("#btnData")


function mostrarSituacao (res) {
   fetch("https://covid19-brazil-api.now.sh/api/status/v1", {
  "method": "GET"
})

    .then (res => res.json())
    .then (dados => {
        const validarStatus = dados.status
        
        
        if (validarStatus == "ok" ) {
            situacao.innerHTML="ONLINE"
        }
    })
    .catch (err => console.error(err))
}

;

function casosPorTodoEstado () {
    fetch("https://covid19-brazil-api.vercel.app/api/report/v1")
    .then (res => res.json())
    .then (dados => {
        const casosPorEstado = dados
        console.log (casosPorEstado)
    })
}

function casosPorData (data) {
   
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${data}`) 
    .then (res => res.json())
    .then (dados => {
        const casosPorData = dados.data
        console.log (casosPorData)

    } )
}

btnData.addEventListener('click', ()=> {
    casosPorData(InformarData.value.replace(/-/g,""))
    console.log (casosPorData)
    console.log(InformarData.value.replace(/-/g,""));
 })

mostrarSituacao ();
casosPorTodoEstado()
casosPorTodoEstado();

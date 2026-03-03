const situacao = document.querySelector("#resultadoConexao")

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

mostrarSituacao ();

fetch("http://localhost:3000/servidor/")
.then(resposta=>resposta.json())
.then((data)=>{
    // let pessoas = document.querySelector('#pessoas');
    let tabela = document.querySelector("#tabela")
    for(let item of data){
        let tr = document.createElement('tr')

        let tdId = document.createElement('td')
        tdId.textContent = item.id
        let tdNome = document.createElement('td')
        tdNome.textContent = item.nome
        let tdIdade = document.createElement('td')
        tdIdade.textContent = item.idade

        tr.appendChild(tdId)
        tr.appendChild(tdNome)
        tr.appendChild(tdIdade)


        //Adicionando um botão de excluir por linha da tabela
        let aExcluir = document.createElement('a')
        aExcluir.textContent = "Excluir"
        aExcluir.classList.add("excluir")

        //Adicionando uma ação quando clicar no botão
        aExcluir.addEventListener('click',(event)=>{
            event.preventDefault();
            fetch("http://localhost:3000/servidor"+'/'+item.id,{
                method:'DELETE'
            })
            .finally(()=>{
                // window.location.reload();
            })
        })

        let tdBotaoExcluir = document.createElement('td')
        tdBotaoExcluir.appendChild(aExcluir)


        let tdBotaoAlterar = document.createElement('td')
        let aAlterar = document.createElement('a')
        aAlterar.classList.add("alterar")
        aAlterar.textContent="Alterar"

        aAlterar.addEventListener('click',(event)=>{
            event.preventDefault()
            document.querySelector('button').textContent ="Alterar"

            let form = document.querySelector('#form-cadastro')
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let id = 100
                let nome = "Tere"
                let idade = 12
                let pessoaUpdate = {
                    id,
                    nome,
                    idade
                }
                fetch("http://localhost:3000/servidor"+"/"+item.id,{
                    method:"ALTER",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(pessoaUpdate)
                })
                .finally(()=>{
                    // window.location.reload();
                })
                
            })
        })

        tdBotaoAlterar.appendChild(aAlterar)


        tr.appendChild(tdBotaoAlterar)
        tr.appendChild(tdBotaoExcluir)

        tabela.appendChild(tr)
    }
})
let form = document.querySelector("#form-cadastro");

form.addEventListener('submit',(event)=>{
event.preventDefault();

if(document.querySelector('button').textContent =="Alterar"){
    return
}
let id = document.querySelector("#id").value;
let nome = document.querySelector("#nome").value;
let idade = document.querySelector("#idade").value;
let pessoa = {
    id,
    nome,
    idade
}
//console.log(pessoa)
fetch("http://localhost:3000/servidor",{
    //Método
    method: 'POST',
    //Tipo de dado
    headers:{
        'Content-Type':'application/json'
    },
    //Quais são os dados
    body: JSON.stringify(pessoa)
})
.then(response=>response.json())
});
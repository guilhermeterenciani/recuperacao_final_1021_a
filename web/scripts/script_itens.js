fetch("http://localhost:3000/itens")
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

        let tdImagem = document.createElement('td')
        let img = document.createElement('img')
        img.src = item.imagem
        img.style.width = "200px"
        img.style.height = "auto"
        tdImagem.appendChild(img)
        let tdDescricao = document.createElement('td')
        tdDescricao.textContent = item.descricao

        tr.appendChild(tdId)
        tr.appendChild(tdNome)
        tr.appendChild(tdImagem)
        tr.appendChild(tdDescricao)


        //Adicionando um botão de excluir por linha da tabela
        let aExcluir = document.createElement('a')
        aExcluir.textContent = "Excluir"
        aExcluir.classList.add("excluir")

        //Adicionando uma ação quando clicar no botão
        aExcluir.addEventListener('click',(event)=>{
            event.preventDefault();
            fetch("http://localhost:3000/itens"+'/'+item.id,{
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
            // O que precisamos fazer aqui?/

            document.querySelector("#id").value = item.id
            document.querySelector("#nome").value = item.nome
            document.querySelector("#descricao").value = item.descricao
            document.querySelector("#imagem").value = item.imagem
            document.querySelector('button').textContent ="Alterar"

            let form = document.querySelector('#form-cadastro')
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let id = document.querySelector('#id').value
                let nome = document.querySelector('#nome').value
                let descricao = document.querySelector('#descricao').value
                let imagem = document.querySelector('#imagem').value
                let pessoaUpdate = {
                    id,
                    nome,
                    imagem,
                    descricao
                   
                }
                fetch("http://localhost:3000/itens"+"/"+item.id,{
                    method:"PUT",
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
let iditem = document.querySelector("#id").value;
let itemnome = document.querySelector("#itemnome").value;
let Imagem = document.querySelector("#Imagem").value;
let descricaoItem = document.querySelector("#descricaoItem").value;
let item = {
    iditem,
    itemnome,
    Imagem,
    descricaoItem
}
//console.log(pessoa)
fetch("http://localhost:3000/itens",{
    //Método
    method: 'POST',
    //Tipo de dado
    headers:{
        'Content-Type':'application/json'
    },
    //Quais são os dados
    body: JSON.stringify(item)
})
.then(response=>response.json())
});
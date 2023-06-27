fetch("http://localhost:3000/emprestimo")
.then(resposta=>resposta.json())
.then((data)=>{
    // let pessoas = document.querySelector('#pessoas');
    let tabela = document.querySelector("#tabela")
    for(let emprestimo of data){
        let tr = document.createElement('tr')

        let tdId = document.createElement('td')
        tdId.textContent = emprestimo.id

        let tdIdItem = document.createElement('td')
        tdIdItem.textContent = emprestimo.id_item

        let tdIdServidor = document.createElement('td')
        tdIdServidor.textContent = emprestimo.id_servidor

        let tdDataEmprestimo = document.createElement('td')
        let dataEmprestimo = new Date(emprestimo.data_emprestimo)
        tdDataEmprestimo.textContent = dataEmprestimo.toLocaleDateString()

        let tdDataDevolucao = document.createElement('td')
        let dataDevolucao = new Date(emprestimo.data_devolucao)
        tdDataDevolucao.textContent = dataDevolucao.toLocaleDateString()

        tr.appendChild(tdId)
        tr.appendChild(tdIdItem)
        tr.appendChild(tdIdServidor)
        tr.appendChild(tdDataEmprestimo)
        tr.appendChild(tdDataDevolucao)
        

        //Adicionando um botão de excluir por linha da tabela
        let aExcluir = document.createElement('a')
        aExcluir.textContent = "Excluir"
        aExcluir.classList.add("excluir")

        //Adicionando uma ação quando clicar no botão
        aExcluir.addEventListener('click',(event)=>{
            event.preventDefault();
            fetch("http://localhost:3000/emprestimo"+'/'+emprestimo.id,{
                method:'DELETE'
            })
            .finally(()=>{
                window.location.reload();
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

            document.querySelector("#id").value = emprestimo.id
            document.querySelector("#item").value = emprestimo.id_item
            document.querySelector("#servidor").value = emprestimo.id_servidor
            document.querySelector("#data_emprestimo").value = new Date(emprestimo.data_emprestimo).toLocaleDateString("af-ZA")
            document.querySelector("#data_devolucao").value = new Date(emprestimo.data_devolucao).toLocaleDateString("af-ZA")
            document.querySelector('button').textContent ="Alterar"

            let form = document.querySelector('#form-cadastro')
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let id = document.querySelector('#id').value
                let id_item = document.querySelector('#item').value
                let id_servidor = document.querySelector('#servidor').value
                let data_emprestimo = document.querySelector('#data_emprestimo').value
                let data_devolucao = document.querySelector('#data_devolucao').value
                let emprestimoUpdate = {
                    id,
                    id_item,
                    id_servidor,
                    data_emprestimo,
                    data_devolucao
                   
                }
                fetch("http://localhost:3000/emprestimo"+"/"+emprestimo.id,{
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(emprestimoUpdate)
                })
                .then(response=>response.json())
                .then((data)=>{
                    alert(data.mensagem)
                    window.location.reload()
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
    let id = document.querySelector('#id').value
    let id_item = document.querySelector('#item').value
    let id_servidor = document.querySelector('#servidor').value
    let data_emprestimo = document.querySelector('#data_emprestimo').value
    let data_devolucao = document.querySelector('#data_devolucao').value
    let emprestimo = {
        id,
        id_item,
        id_servidor,
        data_emprestimo,
        data_devolucao
    }
    //console.log(pessoa)
    fetch("http://localhost:3000/emprestimo",{
        //Método
        method: 'POST',
        //Tipo de dado
        headers:{
            'Content-Type':'application/json'
        },
        //Quais são os dados
        body: JSON.stringify(emprestimo)
    })
    .then(response=>response.json())
    .then((data)=>{
        alert(data.mensagem);
        window.location.reload();
    })
});
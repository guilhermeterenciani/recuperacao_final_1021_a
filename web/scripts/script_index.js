fetch("http://localhost:3000/itens")
.then(resposta=>resposta.json())
.then((data)=>{
    let content = document.querySelector("#content_itens");
    for(let item of data){
        let divItem = document.createElement("div");
        divItem.classList.add("item_emprestimo");
        let divImagem = document.createElement("div");
        divImagem.classList.add("item_imagem");
        let img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.descricao;
        let h2 = document.createElement("h2");
        h2.classList.add("item_titulo");
        h2.textContent = item.nome;
        let p = document.createElement("p");
        p.classList.add("item_descricao");
        p.textContent = item.descricao;
        let a = document.createElement("a");
        a.textContent = "Reservar";
        a.onclick = function onClickReservar(event){
            event.preventDefault();
            console.log("Reservar",item.id);
            let divReserva = document.createElement("div");
            divReserva.classList.add("item_reserva");
            content.classList.add("content_reserva");

            // Adicionar botão de fechar a reserva
            let buttonFechar = document.createElement("button");
            buttonFechar.classList.add("button_fechar");
            buttonFechar.textContent = "X";
            buttonFechar.onclick = function onClickFechar(event){
                event.preventDefault();
                divReserva.remove();
                content.classList.remove("content_reserva");
            }

            // Mostrar informações do item a ser reservado
            let divInfo = document.createElement("div");
            divInfo.classList.add("item_info");
            //Informação de emprestimo na caixa de emprestimo
            let cabecalhoDIV = document.createElement("h1");
            cabecalhoDIV.classList.add("item_cabecalho");
            cabecalhoDIV.textContent = "Reservar Item";
            divInfo.appendChild(cabecalhoDIV);

            let divContent = document.createElement("div");
            divContent.classList.add("item_content");

            let imgInfo = document.createElement("img");
            imgInfo.classList.add("item_imagem");
            imgInfo.src = item.imagem;
            imgInfo.alt = item.descricao;
            let h2Info = document.createElement("h2");
            h2Info.classList.add("item_titulo");
            h2Info.textContent = item.nome;
            let pInfo = document.createElement("p");
            pInfo.classList.add("item_descricao_emprestimo");
            pInfo.textContent = item.descricao;

            let divInfoContent = document.createElement("div");
            divContent.appendChild(imgInfo);
            divInfoContent.appendChild(h2Info);
            divInfoContent.appendChild(pInfo);
            divContent.appendChild(divInfoContent);
            divInfo.appendChild(divContent);
            divReserva.appendChild(divInfo);
            divReserva.appendChild(buttonFechar);

            //criar input de data de emprestimo e data de devolução
            let divData = document.createElement("div");
            divData.classList.add("item_data");
            let labelDataEmprestimo = document.createElement("label");
            labelDataEmprestimo.classList.add("label_data");
            labelDataEmprestimo.textContent = "Data de empréstimo";
            let inputDataEmprestimo = document.createElement("input");
            inputDataEmprestimo.classList.add("input_data");
            inputDataEmprestimo.type = "date";
            inputDataEmprestimo.name = "data_emprestimo";
            inputDataEmprestimo.id = "data_emprestimo";
            let labelDataDevolucao = document.createElement("label");
            labelDataDevolucao.classList.add("label_data");
            labelDataDevolucao.textContent = "Data de devolução";
            let inputDataDevolucao = document.createElement("input");
            inputDataDevolucao.classList.add("input_data");
            inputDataDevolucao.type = "date";
            inputDataDevolucao.name = "data_devolucao";
            inputDataDevolucao.id = "data_devolucao";
            divData.appendChild(labelDataEmprestimo);
            divData.appendChild(inputDataEmprestimo);
            divData.appendChild(labelDataDevolucao);
            divData.appendChild(inputDataDevolucao);
            divReserva.appendChild(divData);

            //Criar um select para escolher o usuário que será feito o empréstimo:
            let divServidores = document.createElement("div");
            divServidores.classList.add("item_servidores");
            let selectServidores = document.createElement("select");
            selectServidores.classList.add("select_servidores");
            fetch("http://localhost:3000/servidor")
            .then(resposta=>resposta.json())
            .then((data)=>{
                for(let servidor of data){
                    let optionServidor = document.createElement("option");
                    optionServidor.classList.add("option_servidor");
                    optionServidor.value = servidor.id;
                    optionServidor.textContent = servidor.nome;
                    selectServidores.appendChild(optionServidor);
                }
            })
            divServidores.appendChild(selectServidores);
            divReserva.appendChild(divServidores);

            //botão de confirmar reserva
            let buttonConfirmar = document.createElement("button");
            buttonConfirmar.classList.add("button_confirmar_emprestimo");
            buttonConfirmar.textContent = "Confirmar";
            buttonConfirmar.onclick = function onClickConfirmar(event){
                event.preventDefault();
                divReserva.remove();
                content.classList.remove("content_reserva");
                let emprestimo = {
                    id_item: item.id,
                    id_servidor: selectServidores.value,
                    data_emprestimo: inputDataEmprestimo.value,
                    data_devolucao: inputDataDevolucao.value
                };
                fetch("http://localhost:3000/emprestimo",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(emprestimo)
                })
                .then(resposta=>resposta.json())
                .then((data)=>{
                    alert(data.mensagem);
                    window.location.reload();
                })
            }
            divReserva.appendChild(buttonConfirmar);
            let body = document.querySelector("body");
            body.appendChild(divReserva);
        
        }
        divImagem.appendChild(img);
        divItem.appendChild(divImagem);

        divItem.appendChild(h2);
        divItem.appendChild(p);
        divItem.appendChild(a);
        content.appendChild(divItem);
    }   
})


import express, {Request,Response} from 'express';
import mysql2, { RowDataPacket } from 'mysql2/promise';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/servidor', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = "SELECT * from servidor";
    const result = await banco.query(consulta);
    res.send(result[0]);
});
app.post('/servidor', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "INSERT INTO servidor VALUES (?,?,?)";
    const result = await banco.query(consulta,[req.body.id,req.body.nome,req.body.idade]);
    banco.end();
    res.send(result[0]);
});
app.delete('/servidor/:id',async (request:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "DELETE FROM servidores WHERE id = ?";
    const result = await banco.query(consulta);
    banco.end();
    res.send(result[0]);
});

app.put('/servidor/:identificador',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "UPDATE servidor SET idservidor = ?, name = ?, Idade = ? WHERE id = ?";
    const result = await banco.query(consulta,[req.body.id,req.body.nome,req.body.idade,req.params.id]);
    banco.end();
    res.send(result[0]);
});





/*===================================Itens==============================*/
app.get('/itens', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = "SELECT * from itens";
    const result = await banco.query(consulta);
    res.send(result[0]);
});
app.post('/itens', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "INSERT INTO itens (id,imagem,descricao) VALUES (?,?,?)";
    const result = await banco.query(consulta,[req.body.id,req.body.imagem,req.body.descricao]);
    banco.end();
    res.send(result[0]);
});
app.delete('/itens/:id',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "DELETE FROM itens WHERE id = ?";
    const result = await banco.query(consulta,[req.params.id]);
    banco.end();
    res.send(result[0]);
});

app.put('/itens/:id',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "UPDATE itens SET id = ?, descricao = ?, imagem = ? WHERE id = ?";
    const result = await banco.query(consulta,[req.body.id,req.body.descricao,req.body.imagem,req.params.id]);
    banco.end();
    res.send(result[0]);
});

/*===================================Emprestimo==============================*/

app.post('/emprestimo', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    //verifica se a data de devolução é maior ou igual a data de emprestimo
    async function verificaDataDevolucao(data_emprestimo:string,data_devolucao:string){
        let dataEmprestimo = new Date(data_emprestimo);
        let dataDevolucao = new Date(data_devolucao);
        if(dataDevolucao >= dataEmprestimo){
            return true;
        }
        else{   
            return false;
        }
    }
    //Verifica se o item já está emprestado
    async function verificaItemJaEmprestado(id_item:number,data_emprestimo:string,data_devolucao:string){
        const consulta =
        "SELECT * FROM emprestimo WHERE id_item = ? AND ((data_emprestimo BETWEEN ? AND ?) OR (data_devolucao BETWEEN ? AND ?))";
        const result: any = await banco.query(consulta,[id_item,data_emprestimo,data_devolucao,data_emprestimo,data_devolucao]);
        if(result[0].length > 0){
            return true;
        }
        else{
            return false;
        }
    }
    if(!await verificaDataDevolucao(req.body.data_emprestimo,req.body.data_devolucao)){
        res.send({"mensagem":"Data de devolução menor que a data de emprestimo"});
    }
    else if(await verificaItemJaEmprestado(req.body.id_item,req.body.data_emprestimo,req.body.data_devolucao)){
        res.send({"mensagem":"Item já emprestado para a data solicitada"});
    }
    else{
        const consulta =
        "INSERT INTO emprestimo (id_item, id_servidor, data_emprestimo, data_devolucao) VALUES (?,?,?,?)";
        const result = await banco.query(consulta,[req.body.id_item,req.body.id_servidor,req.body.data_emprestimo,req.body.data_devolucao]);
        banco.end();
        res.send({"mensagem":"Item emprestado"});
    }
    
});
app.get('/emprestimo', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta =
        "SELECT * FROM  emprestimo";
    const result = await banco.query(consulta);
    banco.end();
    res.send(result[0]);
});

app.delete('/emprestimo/:id',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "DELETE FROM emprestimo WHERE id = ?";
    const result = await banco.query(consulta,[req.params.id]);
    banco.end();
    res.send(result[0]);
});
app.put('/emprestimo/:id',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    //verifica se a data de devolução é maior ou igual a data de emprestimo
    async function verificaDataDevolucao(data_emprestimo:string,data_devolucao:string){
        let dataEmprestimo = new Date(data_emprestimo);
        let dataDevolucao = new Date(data_devolucao);
        if(dataDevolucao >= dataEmprestimo){
            return true;
        }
        else{   
            return false;
        }
    }

    //Verifica se o item já está emprestado
    async function verificaItemJaEmprestado(id_item:number,data_emprestimo:string,data_devolucao:string){
        const consulta =
        "SELECT * FROM emprestimo WHERE id_item = ? AND ((data_emprestimo BETWEEN ? AND ?) OR (data_devolucao BETWEEN ? AND ?))";
        const result: any = await banco.query(consulta,[id_item,data_emprestimo,data_devolucao,data_emprestimo,data_devolucao]);
        const resultadoFiltrado = result[0].filter((emprestimo:any) => emprestimo.id != req.params.id);
        if(resultadoFiltrado.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
    if(!await verificaDataDevolucao(req.body.data_emprestimo,req.body.data_devolucao)){
        res.send({"mensagem":"Data de devolução menor que a data de emprestimo"});
    }
    else if(await verificaItemJaEmprestado(req.body.id_item,req.body.data_emprestimo,req.body.data_devolucao)){
        res.send({"mensagem":"Item já emprestado para a data solicitada"});
    }
    else{  
        const consulta = 
                "UPDATE emprestimo SET id = ?, id_item = ?, id_servidor = ?, data_emprestimo = ?, data_devolucao = ? WHERE id = ?";
        const result = await banco.query(consulta,[req.body.id,req.body.id_item,req.body.id_servidor,req.body.data_emprestimo,req.body.data_devolucao,req.params.id]);
        banco.end();
        
        res.send({"mensagem":"Item alterado com sucesso"});
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
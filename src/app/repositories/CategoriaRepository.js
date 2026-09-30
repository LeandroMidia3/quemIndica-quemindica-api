import {consulta} from '../database/conexao.js';

class CategoriaRepository {

    create(categoria) {
        console.log("criar categoria");
        const sql = "INSERT INTO categoria (nome, status, imagem) VALUES ($1, $2, $3) RETURNING idcategoria";
        return consulta(sql, [categoria.nome, categoria.status, categoria.imagem], "Não foi possível criar a Categoria");
    }

    findById(id) {
        console.log("obter categoria id:" + id);
        const sql = "SELECT * FROM categoria WHERE idcategoria = $1"; 
        return consulta(sql, [id], "Não foi possível obter a lista de categoria");
    }    

    update(id, categoria) {
        const sql = "UPDATE categoria SET nome = $1, status = $2, imagem = $3 WHERE idcategoria = $4";
        return consulta(sql, [categoria.nome, categoria.status, categoria.imagem, id], "Não foi possível atualizar a categoria");
    }
    
    findAllAtivo() {
        console.log("findAllAtivo");
        const sql = "SELECT * FROM categoria WHERE status = 1 ORDER BY nome";
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    findAll() {
        console.log("findAll");
        const sql = "SELECT * FROM categoria ORDER BY nome";
        return consulta(sql, [], "Não foi possível obter a lista");
    }
    
    findAllByProfissional(id) {
        console.log("findAllByProfissional");
        const sql = "SELECT c.idcategoria FROM profissional as u " +
                    "INNER JOIN profissional_categoria as uc on uc.idprofissional = u.idprofissional " +
                    "INNER JOIN categoria as c on c.idcategoria = uc.idcategoria " +
                    "WHERE u.idprofissional = $1";
        return consulta(sql, [id], "Não foi possível obter a lista");
    }

    delete(id) {
        console.log("CHAMOU DELETE");
        const sql = "DELETE FROM categoria WHERE idcategoria = $1";
        return consulta(sql, [id], "Não foi possível excluir a categoria");
    }


    createByProfissional(idprofissional, idcategoria) {
        console.log("criar profissional_categoria");
        const sql = "INSERT INTO profissional_categoria (idprofissional, idcategoria) VALUES ($1, $2)";
        return consulta(sql, [idprofissional, idcategoria], "Não foi possível criar o profissional_Categoria");
    }

    deleteByProfissional(id) {
        const sql = "DELETE FROM profissional_categoria WHERE idprofissional = $1";
        return consulta(sql, [id], "Não foi possível excluir o Profissional_Categoria");
    }


}

export default new CategoriaRepository();

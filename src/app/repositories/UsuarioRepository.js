import {consulta} from '../database/conexao.js';

class UsuarioRepository {

    create(usuario) {
        console.log("criar usuario");
        const datacadastro = usuario.dataCadastro ?? usuario.datacadastro ?? new Date().toISOString();
        const sql = `INSERT INTO usuario (nome, senha, email, datacadastro, perfil, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING idusuario`;
        return consulta(sql, [usuario.nome, usuario.senha, usuario.email, datacadastro, usuario.perfil, usuario.status], 
            "Não foi possível criar o Usuario");
    }

    findById(id) {
        console.log("obter usuario id:" + id);
        const sql = "SELECT idusuario, nome, email, dataCadastro, perfil, status, senha FROM usuario WHERE idusuario = $1"; 
        return consulta(sql, [id], "Não foi possível obter a lista de usuario");
    }    

    login(email, senha) {
        console.log("logar usuario");
        const sql = "SELECT idusuario, nome, email, dataCadastro, perfil, status FROM usuario WHERE email = $1 and senha = $2";
        return consulta(sql, [email, senha], "Não foi possível obter Usuario");
    }

    findSenhaEmail(email) {
        console.log("findByEmail usuario");
        const sql = "SELECT idusuario, senha, nome, email FROM usuario WHERE email = $1";
        return consulta(sql, [email], "Não foi possível obter Usuario");
    }

    findByEmail(email) {
        console.log("logar usuario email");
        const sql = "SELECT idusuario, nome, email, dataCadastro, perfil, status FROM usuario WHERE email = $1";
        return consulta(sql, [email], "Não foi possível obter Usuario");
    }

    update(id, usuario) {
        const sql = "UPDATE usuario SET nome = $1, email = $2 WHERE idusuario = $3 RETURNING idusuario";
        return consulta(sql, [usuario.nome, usuario.email, id], "Não foi possível atualizar a usuario");
    }

    findAll() {
        const sql = "SELECT * FROM usuario order by nome";
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    delete(id) {
        const sql = "DELETE FROM usuario WHERE idusuario = $1";
        return consulta(sql, [id], "Não foi possível excluir a usuario");
    }

    findFavorito(idprofissional, idusuario) {
        console.log("findFavorito");
        const sql = "SELECT * FROM favorito WHERE idprofissional = $1 AND idusuario = $2"; 
        return consulta(sql, [idprofissional, idusuario], "Não foi possível obter o favorito");
    }   

    createFavorito(idprofissional, idusuario) {
        console.log("criar favorito");
        const sql = "INSERT INTO favorito (idprofissional, idusuario) VALUES ($1, $2)";
        return consulta(sql, [idprofissional, idusuario], "Não foi possível criar o favorito");
    }

    deleteFavorito(idprofissional, idusuario) {
        console.log("deletar favorito");
        const sql = "DELETE FROM favorito WHERE idprofissional = $1 AND idusuario = $2";
        return consulta(sql, [idprofissional, idusuario], "Não foi possível criar o favorito");
    }

    updateSenhaByEmail(senha, email) {
        const sql = "UPDATE usuario SET senha = $1 WHERE email = $2";
        return consulta(sql, [senha, email], "Não foi possível atualizar a usuario");
    }

    updateSenhaById(senha, id) {
        const sql = "UPDATE usuario SET senha = $1 WHERE idusuario = $2";
        return consulta(sql, [senha, id], "Não foi possível atualizar a usuario");
    }

}

export default new UsuarioRepository();

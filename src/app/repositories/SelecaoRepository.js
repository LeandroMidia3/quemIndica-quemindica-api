import {consulta} from '../database/conexao.js';

class SelecaoRepository {

    create(selecao) {
        const campos = Object.keys(selecao || {});
        const sql = `INSERT INTO selecoes (${campos.join(', ')}) VALUES (${campos.map((_, index) => `$${index + 1}`).join(', ')})`;
        return consulta(sql, campos.map((campo) => selecao[campo]), "Não foi possível criar a seleção");
    }
    
    findAll() {
        const sql = "SELECT * FROM selecoes";
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    findById(id) {
        const sql = "SELECT * FROM selecoes WHERE id = $1"; 
        return consulta(sql, [id], "Não foi possível obter a lista de seleções");
    }

    update(id, selecao) {
        const campos = Object.keys(selecao || {}).filter((campo) => campo !== 'id');
        const sql = `UPDATE selecoes SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(', ')} WHERE id = $${campos.length + 1}`;
        return consulta(sql, [...campos.map((campo) => selecao[campo]), id], "Não foi possível atualizar a seleção");
    }

    delete(id) {
        const sql = "DELETE FROM selecoes WHERE id = $1";
        return consulta(sql, [id], "Não foi possível excluir a seleção");
    }
}

export default new SelecaoRepository();

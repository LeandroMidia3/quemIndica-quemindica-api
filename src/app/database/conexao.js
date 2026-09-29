import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://quemindica_user:4CDVTnBTYM4Xn2o9p0QupXgG7XYnuqXr@dpg-dau1oo6k1f9s73a18ql0-a.oregon-postgres.render.com/quemindica';

const conexao = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Render exige SSL
  }
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida com sucesso!');
});

/**
 * Executa uma consulta SQL no banco de dados
 * @param {string} sql instrução SQL a ser executada
 * @param {array} valores valores a serem passados para o SQL 
 * @param {string} mensagemReject mensagem a ser exibida em caso de erro
 * @returns Promise
 */
export const consulta = (sql, valores = [], mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (error, results) => {
      if (error) {
        console.log("Erro: " + error);
        return reject(mensagemReject || 'Erro ao executar consulta SQL: ' + error);
      }
      return resolve(results.rows); // no pg os dados ficam em results.rows
    });
  });
};

export default conexao;

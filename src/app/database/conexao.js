import mysql from 'mysql';

 const conexao = mysql.createConnection({
   host: 'dpg-dau1oo6k1f9s73a18ql0-a.oregon-postgres.render.com',
   port: 5432,
   user: 'quemindica_user',
   password: '4CDVTnBTYM4Xn2o9p0QupXgG7XYnuqXr',
   database: 'quemindica',
   ssl: {
    rejectUnauthorized: false // necessário para conexão segura no Render
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
 * execjuta uma consulta SQL no banco de dados
 * @param {string} sql instrução SQL a ser executada
 * @param {string=id | [selecao, id]} valores a ser passados para o SQL 
 * @param {string} mensagemReject mensagem a ser exibida em caso de erro
 * @returns 
 */

export const consulta = (sql, valores='', mensagemReject) => {
  return new Promise((resolve, reject) => {
      conexao.query(sql, valores, (error, results) => {
          if (error) {
              console.log("Erro: " + error);
              return reject(mensagemReject || 'Erro ao executar consulta SQL: ' + error);
          }
          return resolve(results);
      });
  });
}


export default conexao;

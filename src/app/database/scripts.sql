CREATE TABLE IF NOT EXISTS usuario (
  idusuario SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  email VARCHAR(45) NOT NULL,
  dataCadastro TIMESTAMP NOT NULL,
  perfil INTEGER NOT NULL,
  status INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria (
  idcategoria SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  status INTEGER NOT NULL,
  imagem VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS profissional (
  idprofissional SERIAL PRIMARY KEY,
  descricao VARCHAR(400) NOT NULL,
  uriImagemPrincipal VARCHAR(200),
  telefone VARCHAR(20) NOT NULL,
  disponibilidadeInicio VARCHAR(5) NOT NULL,
  disponibilidadeFim VARCHAR(5) NOT NULL,
  avaliacaoMedia DOUBLE PRECISION NOT NULL,
  servico VARCHAR(400) NOT NULL,
  rua VARCHAR(150),
  numero VARCHAR(10),
  bairro VARCHAR(45) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cidade VARCHAR(45) NOT NULL,
  latitude VARCHAR(45),
  idusuario INTEGER NOT NULL,
  cliques INTEGER NOT NULL DEFAULT 0,
  status INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT fk_profissional_usuario
    FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS profissional_categoria (
  idprofissional INTEGER NOT NULL,
  idcategoria INTEGER NOT NULL,
  CONSTRAINT pk_profissional_categoria PRIMARY KEY (idprofissional, idcategoria),
  CONSTRAINT fk_profissional_categoria_profissional
    FOREIGN KEY (idprofissional) REFERENCES profissional (idprofissional)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_profissional_categoria_categoria
    FOREIGN KEY (idcategoria) REFERENCES categoria (idcategoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE INDEX IF NOT EXISTS idx_profissional_categoria_profissional
  ON profissional_categoria (idprofissional);

CREATE INDEX IF NOT EXISTS idx_profissional_categoria_categoria
  ON profissional_categoria (idcategoria);

CREATE TABLE IF NOT EXISTS favorito (
  idusuario INTEGER NOT NULL,
  idprofissional INTEGER NOT NULL,
  CONSTRAINT pk_favorito PRIMARY KEY (idusuario, idprofissional),
  CONSTRAINT fk_favorito_profissional
    FOREIGN KEY (idprofissional) REFERENCES profissional (idprofissional)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_favorito_usuario
    FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE INDEX IF NOT EXISTS idx_favorito_profissional
  ON favorito (idprofissional);

CREATE INDEX IF NOT EXISTS idx_favorito_usuario
  ON favorito (idusuario);

CREATE TABLE IF NOT EXISTS avaliacao (
  idavaliacao SERIAL PRIMARY KEY,
  estrelas INTEGER NOT NULL,
  comentario VARCHAR(150) NOT NULL,
  data TIMESTAMP NOT NULL,
  idusuario INTEGER NOT NULL,
  idprofissional INTEGER NOT NULL,
  CONSTRAINT fk_avaliacao_profissional
    FOREIGN KEY (idprofissional) REFERENCES profissional (idprofissional)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_avaliacao_usuario
    FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE INDEX IF NOT EXISTS idx_avaliacao_profissional
  ON avaliacao (idprofissional);

CREATE INDEX IF NOT EXISTS idx_avaliacao_usuario
  ON avaliacao (idusuario);

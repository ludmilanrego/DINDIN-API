
-- criar banco de dados
create database dindin;

-- criar tabelas
create table usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table categorias (
  id serial primary key,
  descrição text
);

create table transacoes (
  id serial primary key,
  descrição text,
  valor int not null,
  data date,
  categoria_id int references categorias(id) not null,
  usuario_id int references usuarios(id) not null,
  tipo text
);

--iserir categorias na tabela categorias
INSERT INTO "categorias" (descricao) 
VALUES 
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')
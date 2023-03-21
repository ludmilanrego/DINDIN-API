# Aplicação para controle de finanças pessoais 
nodeJS | PostgreSQL | API REST

A API consiste em uma ferramenta para controle de finanças pessoais. As funcionalidades são:

-Cadastrar Usuário
-Fazer Login
-Detalhar Perfil do Usuário Logado
-Editar Perfil do Usuário Logado
-Listar categorias
-Listar transações
-Detalhar transação
-Cadastrar transação
-Editar transação
-Remover transação
-Obter extrato de transações

Todas as funcionalidades operam vinculadas a um banco de dados SQL.

Para experiência completa acessar o repositório [DINDIN - UI] (https://github.com/ludmilanrego/DINDIN-UI)

## Como rodar o projeto


1 - Crie o banco de dados no Beekeeper.

1.1 - Crie uma conexão com:

host: 'localhost',
port: 5433,
user: 'postgres',
password: '123456'

1.2 - Crie uma banco de dadoscom o neome dindin
Copie o comando descrito no arquivo dump.sql na seção reservada para as querys no beekeeper e selecione run.
Após a criação do banco selecione o banco dindin na lista de banco de dados

1.3 - Crie as tabelas
Copie o comando descrito no arquivo dump.sql na seção reservada para as querys no beekeeper e selecione run.

1.4 - Iserira categorias na tabela categorias
Copie o comando descrito no arquivo dump.sql na seção reservada para as querys no beekeeper e selecione run.

2 - Tenha certeza que o npm está instalado.

Para isso use o comando npm -v no terminal do VScode

3 - Com o npm instalado rode o rode em seguida:

npm i npm run dev no terminal do VScode


## Testando a aplicação - Endpoints


### Cadastrar usuário

#### `POST` `/usuario`

Esse endpoint cadastra um novo usuario no sistema

curl --request POST \
  --url http://localhost:3000/usuario \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "José",
    "email": "jose2@email.com",
	  "senha": "123"
}'

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - senha

- **Resposta**  
    O corpo (body) da resposta apresenta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada. 


#### **Exemplo de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

### **Login do usuário**

#### `POST` `/login`

Este endpoint que permite o usuario cadastrado realizar o login no sistema.

curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "jose2@email.com",
	  "senha": "123"
}

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, o corpo da resposta retorna um objeto com a propriedade **token** que possui como valor o token de autenticação gerado e uma propriedade **usuario** que possui as informações do usuário autenticado, exceto a senha do usuário.  

#### **Exemplos de resposta**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

### **Detalhar usuário**

#### `GET` `/usuario`

Essa este endpoint apresenta os dados do próprio perfil do usuário.  
O usuário é identificado através do ID presente no token de autenticação.

curl --request GET \
  --url http://localhost:3000/usuario \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo da resposta apresenta um objeto com os dados do usuário encontrado, com todas as suas propriedades (exceto a senha)


#### **Exemplo de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

Este endpoint realiza alterações no perfil do próprio usuário. 

curl --request PUT \
  --url http://localhost:3000/usuario \
  --header 'Authorization: Bearer tokenUsuario' \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)
 
- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - senha


### **Listar categorias**

#### `GET` `/categoria`

Este endpoint lista as categorias cadastradas.

curl --request GET \
  --url http://localhost:3000/categoria \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta apresenta um array dos objetos (categorias) encontrados.  
    
#### **Exemplo de resposta**

```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Este endpoint lista todas as transações cadastradas para o usuário logado. 

curl --request GET \
  --url http://localhost:3000/transacao \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)
 
- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta apresenta um array dos objetos (transações) encontrados.  
    

#### **Exemplo de resposta**

```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Este endpoint retorna os dados de uma trasação especifica cadastrada para o usuário logado 

curl --request GET \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login) 

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta apresenta um objeto que representa a transação encontrada, com todas as suas propriedades

#### **Exemplo de resposta**

```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Este endpoint cadastra uma transação associada ao usuário logado.  

curl --request POST \
  --url http://localhost:3000/transacao \
  --header 'Authorization: Bearer tokenUsuario' \
  --header 'Content-Type: application/json' \
  --data '{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24",
    "categoria_id": 6
}'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
    Em caso de **sucesso**, o corpo da resposta retorna as informações da transação cadastrada, incluindo seu respectivo `id`.  

#### **Exemplo de resposta**

```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Este endpoint atualiza uma das transações cadastradas para o usuario logado.  

curl --request PUT \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer tokenUsuario' \
  --header 'Content-Type: application/json' \
  --data '{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)


### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Este endpoint exclui uma das transações cadastradas para o usuario logado. 

curl --request DELETE \
  --url http://localhost:3000/transacao/1 \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login) 

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Este endpoint obtem o extrato de todas as suas transações cadastradas.

curl --request GET \
  --url http://localhost:3000/transacaoo/extrato \
  --header 'Authorization: Bearer tokenUsuario'

****No header substituir tokenUsuario pelo token do usuario logado (token recebido como resposta ao realizar o login)

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, do corpo da resposta apresenta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
    

#### **Exemplo de resposta**

```javascript
{
 "entrada": 300000,
 "saida": 15800
}
```

###### tags: `back-end` `nodeJS` `PostgreSQL` `API REST`
# API de Negociações

## Introdução

Esta foi desenvolvida para o teste técnico da Hubify. A API gerencia **negociações, funis e leads**, permitindo operações de **criação, atualização, busca e remoção** de registros.

---

## Comentários

- Tenho experiência no desenvolvimento de APIs em Node.js utilizando Express e TypeScript. Já havia estudado um pouco de NestJS anteriormente e decidi me desafiar desenvolvendo toda a API nesse framework.
- Considerei implementar testes unitários, mas, devido à simplicidade das lógicas propostas, percebi que as próprias validações da API já garantiam um nível sólido de consistência.
- Utilizei o Swagger para documentar a API, mas também disponibilizei uma coleção do Postman, que pode ser encontrada na raiz do projeto com o nome: `POSTMAN_COLLECTION.json`.

Fiz algumas alterações no projeto e acredito que seja relevante destacar os motivos:

- Padronização de nomes: Ajustei os nomes das colunas nas tabelas para adequá-los a um contexto internacional, considerando que a vaga é para um cliente estrangeiro.
- Organização da estrutura: Padronizei os nomes das tabelas e dos status para garantir uma estrutura mais consistente. Considerei criar um campo separado na tabela funnels para armazenar o "status" separadamente do nome, mas optei por manter a estrutura original solicitada.
- Regra para cadastro de leads: Implementei uma restrição para evitar o cadastro de leads com os mesmos dados de contato. Como essa não era uma exigência do teste, adicionei a opção force, permitindo o cadastro mesmo quando os dados já existirem.

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```sh
   git clone https://github.com/felipefunk/testApi.git
   cd testApi
   ```

2. **Instalar as dependências do projeto**:

   ```sh
   npm install
   ```

3. **Executar Docker compose**:

   ```sh
   docker-compose up --build
   ```

4. **Criar as tabelas no banco**:

   ```sh
   npx prisma migrate dev --name init
   ```

5. **STEP OPCIONAL => Executar o arquivo para inserir os funís padrão**:
   ```sh
   npm run seed
   ```

---

## URL Base

```
   http://localhost:3000
```

---

## Swagger docs

```
   http://localhost:3000/api-docs
```

---

## Endpoints

### 1️⃣ Funis (`/funnels`)

### => Criar um Funil

- Method: POST
- URL: `/funnels`
- Body:

```json
{
  "name": "LOST"
}
```

### => Atualizar um Funil

- Method: PATCH
- URL: `/funnels/:id`
- Body:

```json
{
  "name": "WIN"
}
```

---

### 2️⃣ Leads (`/leads`)

### => Criar um Lead

- Method: POST
- URL: `/leads`
- Body:

```json
{
  "name": "Nome do Lead",
  "email": "email@exemplo.com",
  "phone": "999999999",
  "force": false (opcional)
}
```

### => Atualizar um Lead

- Method: PATCH
- URL: `/leads/:id`
- Body:

```json
{
  "name": "Nome do Lead2",
  "email": "teste@teste.com",
  "phone": "8888888888"
}
```

### => Buscar um Lead por ID

- Method: GET
- URL: `/leads/byId/:id`

### => Deletar um Lead (Apenas para Testes)

- URL: DELETE `/leads/:id`

---

### 3️⃣ Negociações (`/negotiations`)

### => Criar uma Negociação

- Method: POST
- URL: `/negotiations`
- Body:

```json
{
  "title": "Título da negociação",
  "leadId": 12
}
```

### => Buscar uma Negociação por ID

- Method: GET
- URL: `/negotiations/:id`

### => Buscar Todas as Negociações de um Funil ID

- Method: GET
- URL: `/negotiations/funnel/:funnelId`

### => Buscar Todas as Negociações de um Lead ID

- Method: GET
- URL: `/negotiations/lead/:leadId`

### => Buscar Todas as Negociações de um Status(Nome do status)

- Method: GET
- URL: `/negotiations/status/:status`

### => Atualizar uma negociação (Usar com cautela)

- Method: PATCH
- URL: `/negotiations/:id`
- Body:

```json
{
  "title": "Título da negociação",
  "status": "WIN",
  "leadId": 12
}
```

### => Atualizar funil da negociação por Funil ID

- Method: PATCH
- URL: `/negotiations/:id/funnel/:funnelId`

### => Atualizar funil da negociação por Status Name

- Method: PATCH
- URL: `/negotiations/:id/status/:statusName`

---

## Tecnologias Utilizadas

- NestJS - Framework para aplicações Node.js.
- Prisma - ORM para interagir com o banco de dados.
- PostgreSQL - Banco de dados utilizado.
- Swagger - Testes e documentação da API.
- Postman - Testes e documentação da API.

# Backend do Sistema de Ponto

Este projeto é o backend para o Sistema de Ponto, responsável por fornecer as APIs e lógica de negócio para o sistema de registro de frequência de funcionários baseado em localização.

## Requisitos

- Node.js v14.0.0 ou superior
- npm v6.0.0 ou superior
- Banco de dados compatível (PostgreSQL, MySQL, SQLITE, etc.)

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/DiogoAlberto0/SistemaDePonto_Back.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd rr_back
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

## Configuração

Para que o projeto funcione corretamente, você precisa configurar duas variáveis de ambiente: `DATABASE_URL` e `JWT_SECRET`.

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes linhas ao arquivo `.env`, substituindo os valores de exemplo pelos valores reais:

    ```plaintext
    DATABASE_URL=YOUR_DATABASE_URL
    JWT_SECRET=YOUR_JWT_SECRET
    ```

## Migrações e Seed

Para configurar o banco de dados com as tabelas necessárias e adicionar um usuário inicial, siga os passos abaixo:

1. Execute as migrações para criar o esquema do banco de dados:

    ```sh
    npx prisma migrate dev --name init
    ```

2. Execute o script de seed para popular o banco de dados com dados iniciais:

    ```sh
    npm run seed
    ```

    O script de seed adicionará um usuário com os seguintes dados:
    - Nome: admin
    - Número de telefone: 123456789
    - Senha: 12345

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com `nodemon` e `ts-node`.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run start`: Inicia a aplicação em modo de produção.
- `npm run seed`: Executa o script de seed para popular o banco de dados com dados iniciais.
- `npm test`: Executa os testes utilizando `vitest`.

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `prisma/`: Contém o esquema do Prisma e o script de seed.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Feito com ❤️ por [Diogo Alberto](https://github.com/DiogoAlberto0)

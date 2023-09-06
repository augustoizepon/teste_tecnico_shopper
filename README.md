# Sistema de Atualização de Preços do Shopper

Este é um sistema que permite aos usuários visualizar listas de produtos e pacotes, validar e atualizar os preços dos produtos. O sistema é dividido em um lado do servidor e um lado do cliente.

## Conteúdo

1. [Instalação e Configuração](#instalação-e-configuração)
    - [Instalação do MySQL](#instalação-do-mysql)
    - [Configuração do MySQL](#configuração-do-mysql)
    - [Configuração do Servidor](#configuração-do-servidor)
    - [Configuração do Cliente](#configuração-do-cliente)
2. [Executando o Sistema](#executando-o-sistema)
3. [Visão Geral do Sistema](#visão-geral-do-sistema)
    - [Lado do Servidor](#lado-do-servidor)
    - [Lado do Cliente](#lado-do-cliente)
4. [Uso do Sistema](#uso-do-sistema)
    - [Visualização de Produtos e Pacotes](#visualização-de-produtos-e-pacotes)
    - [Validação e Atualização de Preços](#validação-e-atualização-de-preços)

## Instalação e Configuração

Antes de executar o sistema, é necessário configurar o ambiente.

### Instalação do MySQL

O sistema requer um servidor MySQL para armazenar dados. Siga estas etapas para instalar o MySQL:

#### Passo 1: Baixe o MySQL

- Acesse o site oficial do MySQL para download: [Página de Downloads do MySQL](https://dev.mysql.com/downloads/mysql/).
- Escolha a versão apropriada para o seu sistema operacional (por exemplo, MySQL Community Server).
- Faça o download do instalador apropriado.

#### Passo 2: Instale o MySQL

- Execute o instalador que você baixou no passo anterior.
- Siga as instruções do assistente de instalação. Você pode optar por instalar o MySQL Server e o MySQL Workbench (uma ferramenta de gerenciamento gráfico) durante o processo de instalação.
- Durante a instalação, você será solicitado a configurar uma senha para o usuário root do MySQL. Certifique-se de lembrar dessa senha, pois você a usará posteriormente.

#### Passo 3: Inicie o MySQL Server

- Após a instalação, o MySQL Server deve ser iniciado automaticamente como um serviço no seu sistema. Você pode verificar isso acessando o "Serviços" no Windows ou usando comandos no terminal no Linux ou macOS.
- Para verificar o status do serviço no Linux, você pode usar o seguinte comando:
  ```
  sudo service mysql status
  ```
- Se o serviço não estiver em execução, você pode iniciá-lo com o seguinte comando:
  ```
  sudo service mysql start
  ```
- No Windows, você pode iniciar o serviço MySQL a partir da interface de serviços do Windows.

### Configuração do MySQL

Após a instalação do MySQL, você precisa configurar o servidor MySQL para funcionar com o sistema.

#### Passo 1: Acesso ao MySQL

- Abra um terminal ou prompt de comando.
- Acesse o servidor MySQL como usuário root usando a senha que você configurou durante a instalação:
  ```
  mysql -u root -p
  ```
- Você será solicitado a inserir a senha do usuário root.

#### Passo 2: Altere a Autenticação do Usuário root

- Execute o seguinte comando SQL no prompt do MySQL para alterar a autenticação do usuário root para 'mysql_native_password' e definir uma nova senha (no exemplo, usamos '12345678', mas você pode escolher sua própria senha):
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '12345678';
  ```
- Certifique-se de substituir `'12345678'` pela senha que você deseja usar.

#### Passo 3: Atualize os Privilégios

- Após alterar a senha do usuário root, você deve atualizar os privilégios para que as alterações entrem em vigor:
  ```sql
  FLUSH PRIVILEGES;
  ```

#### Passo 4: Saia do MySQL

- Depois de concluir as etapas acima, saia do prompt do MySQL:
  ```sql
  exit;
  ```

### Configuração do Servidor

O lado do servidor do sistema é responsável por gerenciar os dados e expor uma API para o lado do cliente. O servidor utiliza o Node.js com o framework Express.js.

Para configurar o servidor:

1. Navegue até a pasta `server` no diretório do sistema.
2. Instale as dependências do servidor executando o seguinte comando:
   ```
   npm install
   ```
3. Abra o arquivo `server.js` e atualize as configurações do banco de dados, como host, nome de usuário, senha e nome do banco de dados, conforme necessário.
4. Inicie o servidor com o seguinte comando:
   ```
   npm start
   ```
5. O servidor estará em execução na porta 3001 por padrão. Certifique-se de que o servidor MySQL também esteja em execução.

### Configuração do Cliente

O lado do cliente do sistema é uma aplicação React.js que permite aos usuários interagir com o servidor. Para configurar o cliente:

1. Navegue até a pasta `client` no diretório do sistema.
2. Instale as dependências do cliente executando o seguinte comando:
   ```
   npm install
   ```
3. Abra o arquivo `src/App.js` e atualize a URL base da API, se necessário. Por padrão, a URL base é `http://localhost:3001`.
4. Inicie o cliente com o seguinte comando:
   ```
   npm start
   ```
5. A aplicação React será executada em um servidor de desenvolvimento e estará acessível em `http://localhost:3000` no seu navegador.

## Executando o Sistema

Após a instalação e configuração, você pode executar o sistema seguindo estas etapas:

1. Certifique-se de que o servidor MySQL e o servidor Node.js (lado do servidor) estejam em execução.
2. Inicie o cliente React (lado do cliente) com `npm start` na pasta `client`.
3. Acesse a aplicação em `http://localhost:3000` no seu navegador.

Agora você está pronto para usar o Sistema de Atualização de Preços do Shopper.

## Visão Geral do Sistema

### Lado do Servidor



O lado do servidor do sistema é construído com Node.js e Express.js e inclui os seguintes componentes:

#### Código 1 - Configuração do Servidor (server.js)

- Este arquivo configura o servidor Express.js e define rotas para lidar com solicitações HTTP.
- Ele usa bibliotecas como `express` e `cors` para configuração do servidor.
- O servidor escuta a porta 3001 por padrão.

#### Código 2 - Interação com o Banco de Dados e Controladores (controllers/products.js)

- Este arquivo contém funções para interagir com o banco de dados MySQL.
- A configuração da conexão com o banco de dados é definida usando `mysql.createConnection`.
- Funções estão disponíveis para recuperar produtos do banco de dados (`getProducts`), atualizar dados do produto (`updateProductData`), e recuperar pacotes do banco de dados (`getPacks`).

#### Código 3 - Definições de Rotas (routes/products.js)

- Este arquivo define as rotas para o servidor usando o Express.js.
- Rotas HTTP GET e PUT são definidas para produtos e pacotes, permitindo que os clientes obtenham dados de produtos e pacotes e atualizem os preços dos produtos.

### Lado do Cliente

O lado do cliente do sistema é uma aplicação React.js que fornece uma interface de usuário para interagir com o servidor. Ele inclui os seguintes componentes:

#### Código 4 - Aplicação React.js (client/src/App.js)

- Este arquivo contém a lógica do lado do cliente para a aplicação.
- Os estados são gerenciados usando React Hooks, incluindo `useState` para gerenciar entradas de formulário e dados, e para controlar o estado do botão de atualização.
- Os usuários podem inserir um código de produto e um novo preço, e o sistema valida se a atualização é permitida com base em determinadas condições.
- Os usuários podem visualizar listas de produtos e pacotes e receber alertas para atualizações inválidas.
- A aplicação utiliza Axios para realizar solicitações HTTP ao servidor.

## Uso do Sistema

### Visualização de Produtos e Pacotes

- Após iniciar o sistema, você verá uma lista de produtos no lado esquerdo da interface e uma lista de pacotes no lado direito.
- Cada produto é exibido com um código, nome e preço de venda.
- Cada pacote é exibido com um código de pacote, descrição e preço total.
- Você pode atualizar a lista de produtos e pacotes clicando nos botões "Atualizar Lista".

### Validação e Atualização de Preços

- Para validar e atualizar preços de produtos, siga estas etapas:
  - Insira o código do produto no campo "Código do Produto".
  - Clique no botão "Procurar" para verificar o nome e o preço atual do produto.
  - Insira o novo preço no campo "Novo Valor do Produto".
  - Clique no botão "Validar" para verificar se a atualização é permitida.
  - O sistema validará se o novo preço está dentro das condições especificadas.
  - Se a atualização for válida, o botão "Atualizar Produto" será habilitado.
  - Clique no botão "Atualizar Produto" para confirmar a atualização do preço.
  - Você receberá uma mensagem de confirmação ou erro após a atualização.

Agora você está pronto para usar o Sistema de Atualização de Preços do Shopper!

---

Este README fornece informações detalhadas sobre a instalação, configuração e uso do Sistema de Atualização de Preços do Shopper. Siga as instruções fornecidas para configurar e executar o sistema em seu ambiente de desenvolvimento.
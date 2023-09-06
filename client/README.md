# Shopper App Readme

Este é um aplicativo React para gerenciar produtos e packs da loja Shopper. Ele permite que você visualize uma lista de produtos, uma lista de packs, busque produtos por código, valide e atualize o preço de produtos.

## Como Iniciar o Aplicativo

Para iniciar o aplicativo, siga estas etapas:

1. Certifique-se de que você tem o [Node.js](https://nodejs.org/) e o [Yarn](https://yarnpkg.com/) instalados em seu sistema.

2. Clone ou baixe este repositório em seu computador.

3. Abra um terminal e navegue até o diretório onde o aplicativo está localizado (a pasta client).

4. Execute o seguinte comando para instalar as dependências:

   ```bash
   yarn install
   ```

5. Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar o aplicativo:

   ```bash
   yarn start
   ```

6. O aplicativo será iniciado e estará disponível no seu navegador em [http://localhost:3000](http://localhost:3000).

## Recursos do Aplicativo

O aplicativo oferece as seguintes funcionalidades:

### Lista de Produtos

- Exibe uma lista de produtos da loja Shopper, incluindo código, nome e preço.
- Você pode atualizar a lista de produtos clicando no botão "Atualizar Lista".

### Lista de Packs

- Apresenta uma lista de packs que contêm produtos em quantidades específicas.
- Mostra o código do pack, a descrição (quantidade x nome do produto) e o preço total do pack.
- Você pode atualizar a lista de packs clicando no botão "Atualizar Lista".

### Validação de Produto

- Permite que você pesquise um produto por código.
- Exibe o nome do produto e o valor atual do produto após a pesquisa.
- Você pode inserir um novo valor para o produto e validar se a atualização é possível clicando no botão "Validar".
- Se a atualização for válida, o botão "Atualizar Produto" estará habilitado para realizar a atualização.

### Atualização de Produto

- Permite que você atualize o preço de um produto com um novo valor após a validação.
- O botão "Atualizar Produto" estará habilitado somente se a atualização for válida.
- Após clicar no botão "Atualizar Produto", o preço do produto será atualizado no servidor.

### Alertas

- Um alerta será exibido se os dados inseridos para a atualização do produto não estiverem corretos ou se o novo valor ultrapassar 10% do valor atual.

## Importante

- Certifique-se de que o servidor de backend esteja em execução e configurado corretamente para que o aplicativo funcione adequadamente.

Este aplicativo foi desenvolvido como uma interface de usuário para interagir com um servidor de backend que lida com os dados de produtos e packs da loja Shopper.

Divirta-se usando o aplicativo Shopper! Se você tiver alguma dúvida ou encontrar problemas, sinta-se à vontade para entrar em contato com a equipe de suporte.
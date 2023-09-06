import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  // Estado para armazenar os valores dos campos de entrada
  const [values, setValues] = useState(
    {
      codigo: '',
      valorNovo: ''
    }
  )

  // Estado para armazenar a lista de produtos
  const [productList, setProductList] = useState([]);
  // Estado para armazenar a lista de pacotes
  const [packList, setPackList] = useState([])

  // Estado para controlar a habilitação do botão de atualização
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);

  // Função para lidar com a alteração dos valores dos campos de entrada
  const handleChangeValues = value => {
    setValues(preValue => ({
      ...preValue,
      [value.target.name]: value.target.value
    }))
  }

  // Função para validar se a atualização do produto é possível
  const validationBtn = async () => {
    let update = {
      new_price: Number(values.valorNovo),
      product_code: Number(values.codigo)
    };
    const jsonData = await axios.get(`http://localhost:3001/`);
    const productByCode = jsonData.data.find(product => product.code === update.product_code);
  
    // Verifica se a atualização é válida com base em algumas condições
    const isValid = (
      productByCode &&
      update.new_price &&
      (update.new_price - productByCode.sales_price) <= productByCode.sales_price * 0.1 &&
      update.new_price > productByCode.sales_price
    );
  
    // Desabilita o botão de atualização se não for válido
    setIsUpdateButtonDisabled(!isValid);
  }

  // Função para realizar a atualização do preço do produto
  const updateBtn = async () =>{
    let update = {
      new_price: Number(values.valorNovo),
      product_code: Number(values.codigo)
    }
    const jsonData = await axios.get(`http://localhost:3001/`)
    jsonData.data.find(product => product.code === update.product_code)
    await axios.put(`http://localhost:3001/`, update)
  }

  // Função para atualizar a lista de produtos
  const refreshProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/`);
      setProductList(response.data);
    } catch (error) {
      console.error("Erro ao buscar a lista de produtos: ", error);
    }
  };

  // Função para atualizar a lista de pacotes
  const refreshPacks = async () => {
    try {
      const responsePacks = await axios.get(`http://localhost:3001/packs`);
      const packData = responsePacks.data

      let newPacklist = []
      for (let i = 0; i < packData.length; i++) {
        const pack = packData[i]
        const product = productList.find(product => product.code === pack.product_id)
        const newPack = {
          pack: pack,
          product: product
        }
        newPacklist.push(newPack)
      }
      setPackList(newPacklist)
    } catch (error) {
      console.error("Erro ao buscar a lista de produtos: ", error);
    }
  }

  // Variável para exibir alerta se o botão de atualização estiver desabilitado
  let alert = ``

  if (isUpdateButtonDisabled === true){
    alert = `Por Favor, preencha os dados corretamente, o novo valor do produto não ultrapassa 10% do seu valor atual`
  }

  // Função para buscar um produto pelo código
  const searchClickBtn = async value => {
    setValues(preValue => ({
      ...preValue,
      [value.target.name]: value.target.value
    }))
    const jsonData = await axios.get(`http://localhost:3001/`)
    const codeNumber = Number(values.codigo)
    const productByCode = jsonData.data.find(produto => produto.code === codeNumber)
    if (productByCode) {
      setValues({
        ...values,
        nomeProduto: productByCode.name,
        valorAtual: productByCode.sales_price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      });
    } else {
      setValues({
        nomeProduto: `(404) Produto não encontrado. Por favor, verifique a lista de produtos e tente novamente`
      })
    }
  }

  return (
    <div className="app--container">
      <img src="https://landing.shopper.com.br/static/media/logo-original.c7089ad32bcf61645d35.webp" alt="logo-shopper"></img>
      <div className="main--container">
        <div className="product--container">
          <h2>Lista de produtos</h2>
          <ol className="product-list--container">
            {productList.map((product) => (
              <li key={product.code}>
                <table>
                  <tr>
                    <th className="code--table">codigo</th>
                    <th className="name--table">nome</th>
                    <th className="price--table">preco</th>
                  </tr>
                  <tr>
                    <td className="code--table">{product.code}</td>
                    <td className="name--table">{product.name}</td>
                    <td className="price--table">{product.sales_price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}</td>
                  </tr>
                </table>
              </li>
            ))}
          </ol>
          <button className="updateStatus-product--btn" onClick={refreshProducts}>Atualizar Lista</button>
        </div>
        <div className="packs--container">
          <h2>Lista de packs</h2>
          <ol className="product-list--container">
            {packList.map((pack) => (
              <li key={pack.code}>
                <table>
                  <tr>
                    <th className="code-pack--table">cod. pack</th>
                    <th className="description-pack--table">descricao</th>
                    <th className="price-pack-table">preco</th>
                  </tr>
                  <tr>
                    <td className="code--table">{pack.pack.pack_id}</td>
                    <td className="name--table">{pack.pack.qty} x {pack.product.name}</td>
                    <td className="price-pack--table">{(pack.product.sales_price * pack.pack.qty).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}</td>
                  </tr>
                </table>
              </li>
            ))}
          </ol>
          <button className="updateStatus-pack--btn" onClick={refreshPacks}>Atualizar Lista</button>
        </div>
        <div className="register--container">
          <h2>Validação de produto</h2>
          <label className="product-code--label">codigo do produto:*</label>
          <input name="codigo" type="number" className="product-code--input" inputmode="numeric" onChange={handleChangeValues}></input>
          <button className="search--btn" onClick={searchClickBtn} >Procurar</button>
          <label className="product-name--label">nome do produto:</label>
          <p name="nome" className="product-name--p">{values.nomeProduto}</p>
          <label className="product-first-value--label">valor atual do produto:</label>
          <p className="product-first-value--p">{values.valorAtual}</p>
          <label className="product-second-value--label">novo valor do produto:*</label>
          <input name="valorNovo" type="number" className="product-second-value--input" inputmode="numeric" onChange={handleChangeValues}></input>
          <button className="validation--btn" onClick={validationBtn}>Validar</button>
          <button className="update--btn" onClick={updateBtn} disabled={isUpdateButtonDisabled}>Atualizar Produto</button>
          <p className="alert--p">{alert}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [values, setValues] = useState(
    {
      codigo: '',
      valorNovo: ''
    }
  )

  const handleChangeValues = value => {
    setValues(preValue => ({
      ...preValue,
      [value.target.name]: value.target.value
    }))
  }


  const handleClickButton = async () => {
    let update = {
      new_price: Number(values.valorNovo),
      product_code: Number(values.codigo)
    }
    const jsonData = await axios.get(`http://localhost:3001/`)
    const productByCode = jsonData.data.find(product => product.code === update.product_code)
    if(update.new_price && (update.new_price - productByCode.sales_price) <= productByCode.sales_price * 0.1 && update.new_price > productByCode.sales_price){
      await axios.put(`http://localhost:3001/`, update)
      console.log(values)
    } else{
      alert("O valor só pode ser de ate 10% a mais")
    }
    
  }
  //de acordo com o codigo do produto, apos acionar o botao procurar, vai verificar no arquivo json se consta, para entao poder modificar
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

    }else {
      setValues({
        nomeProduto: `produto nao encontrado`
      })
    }
  }

  return (
    <div className="app--container">
      <div className="register--container">
        <h1>Validacao de produto</h1>
        <label className="product-code--label">codigo do produto:</label>
        <input name="codigo"type="number"  className="product-code--input" inputmode="numeric" onChange={handleChangeValues}></input>
        <button className="search--btn" onClick={searchClickBtn} >Procurar</button>
        <label className="product-name--label">nome do produto:</label>
        <p name="nome" className="product-name--p">{values.nomeProduto}</p>
        <label className="product-first-value--label">valor atual do produto:</label>
        <p className="product-first-value--p">{values.valorAtual}</p>
        <label className="product-second-value--label">novo valor do produto:</label>
        <input name="valorNovo" type="number" className="product-second-value--input" inputmode="numeric" onChange={handleChangeValues}></input>
        <button className="validation--btn" onClick={handleClickButton}>Validar/Atualizar</button>
      </div>

    </div>
  );
}

export default App;

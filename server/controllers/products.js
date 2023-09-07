// Importar as bibliotecas necessárias
const mysql = require('mysql');
const fs = require('fs/promises');
const { path } = require('../routers/routes');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { format } = require(`date-fns-tz`)
let changes = []
// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "database"
});

// Função para obter os produtos do banco de dados
const getProducts = (req, res) => {
    let sql = "SELECT * FROM products";

    // Executar a consulta SQL e enviar os resultados como resposta
    db.query(sql, async (err, result) => {
        res.send(result);
    });
}

// Função para atualizar os dados de um produto
const updateProductData = (req, res) => {
    const { product_code, new_price } = req.body;
    const date = new Date()
    const dateFormated = format(date, 'dd/MM/yy HH:mm:ss')

    const changeObject = {
        product_code: product_code,
        new_price: new_price,
        date: dateFormated
    }

    changes.push(changeObject)

    const writePriceChangesCsv = (changes) => {
        const csvWriter = createCsvWriter({
            path: '../tabela_de_dados/changes.csv',
            header: [
                { id: 'product_code', title: 'Código do Produto' },
                { id: 'new_price', title: 'Novo Preço' },
                { id: 'date', title: 'Data' },
            ]
        })
    
        csvWriter.writeRecords(changes)
        .then(() => {
            console.log('Arquivo CSV criado com sucesso.');
        })
        .catch((error) => {
            console.error('Erro ao criar o arquivo CSV:', error);
        });
    }
        writePriceChangesCsv(changes)


    // Criar um objeto com os dados atualizados do produto
    const updatedProductData = {
        sales_price: Number(new_price),
    };

    // Consulta SQL para atualizar os dados do produto com base no código
    const sql = "UPDATE products SET ? WHERE code = ?";
    db.query(sql, [updatedProductData, product_code], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar o produto" });
        } else {
            console.log(`Produto com Código ${product_code} atualizado com sucesso`);
            res.json({ message: "Produto atualizado com sucesso" });
        }
    });
}

// Função para obter os pacotes do banco de dados
const getPacks = (req, res) => {
    let sql = "SELECT * FROM packs";

    // Executar a consulta SQL e enviar os resultados como resposta
    db.query(sql, async (err, result) => {
        const results = JSON.stringify(result);
        res.send(result);
    });
}

// Exportar as funções para serem usadas em outros lugares
module.exports = {
    getProducts,
    getPacks,
    updateProductData
}

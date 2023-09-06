const mysql = require(`mysql`)

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "database"
})

const getProducts = (req, res) => {
    let sql = "SELECT * FROM products"
    db.query(sql, async (err, result) => {
        res.send(result)
    })
}


const updateProductData = (req, res) => {
    const {product_code, new_price} = req.body
    console.log(new_price)
    const updatedProductData = {
        sales_price: Number(new_price),
    };

    const sql = "UPDATE products SET ? WHERE code = ?";
    db.query(sql, [updatedProductData, product_code], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar o produto" });
        } else {
            console.log(`Produto com Codigo ${product_code} atualizado com sucesso`);
            res.json({ message: "Produto atualizado com sucesso" });
        }
    });
}

const getPacks = (req, res) => {
    let sql = "SELECT * FROM packs"
    db.query(sql, async (err, result) => {
        const results = JSON.stringify(result)
        res.send(result)
    })
}


module.exports = {
    getProducts,
    getPacks,
    updateProductData
}
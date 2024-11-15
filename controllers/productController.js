//Controllers are going to control whatever the particular route is going to do and interact with the model to get the data to send back.

const Product = require('../models/productModel');

const { getPostData } = require('../utils');

// @desc Get all products
// @route GET /api/products
async function getProducts(req, res){
    try{
        const products = await Product.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    }catch(err){
        console.log(err);
    }
}

// @desc Get Single Product
// @route GET /api/product/:id
async function getProduct(req, res , id){
    try{
        const product = await Product.findById(id);

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product Not Found'}));
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(product));
        }
    }catch(err){
        console.log(err)
    }
}

// @desc Create a Product
// @rote POST /api/products
async function createProduct(req, res){
    try{
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body); 

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product);

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));

    }catch(err){
        console.log(err);
    }
}

// @desc Update a Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id){
    try{
        const product = await Product.findById(id);

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product Not Found'}));
        }else{
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body); 

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updProduct));
        }

    }catch(err){
        console.log(err);
    }
}

// @desc Delete Product
// @route DELETE /api/product/:id
async function deleteProduct(req, res , id){
    try{
        const product = await Product.findById(id);

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product Not Found'}));
        }else{
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Product ${id} removed`}));
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
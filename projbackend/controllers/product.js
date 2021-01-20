const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getAllProducts = (req , res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find().select("-photo").populate("category").sort([[sortBy , "asc"]]).limit(limit).exec((err , products)=>{
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(products)
    })
}

exports.getProductById = (req , res, next , id)=>{
    Product.findById(id).populate("category").exec((err , product)=>{
        if(err){
            return res.status(400).json({
                error: "This Product is Unavailable"
            });
        }
        req.product = product;
        next();
    });
};

exports.getProduct = (req , res)=>{
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req , res , next)=>{
    if(req.product.photo.data){
        res.set("Content-Type" , req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.createProduct = (req , res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req , (err , fields , file)=>{
        if(err){
            res.status(400).json({
                error: "problem with image"
            });
        }

        //Destructure The Field
        const {name , description , price , category , stock} = fields;

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please fill all the fields"
            });
        }

        // TODO: Restriction of Field
        let product = new Product(fields);

        //Handle File Here
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error: "File Size Tooo Big...!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        console.log(product);
        //Save To The DB
        product.save((err , product)=>{
            if(err){
                return res.status.json({
                    error: "Saving Tshirt in DB failed"
                })
            }
            res.json(product);
        })
    });
}

//Delete Controllers
exports.deleteProduct = (req , res)=>{
    let product = req.product;
    product.remove((err , deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed Tom Delete Product"
            })
        }
        res.json(`Deletion of ${deletedProduct.name} successful`)
    })
}


exports.updateProduct = (req , res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req , (err , fields , file)=>{
        if(err){
            res.status(400).json({
                error: "problem with image"
            });
        }


        //Updation Code
        let product = req.product;
        product = _.extend(product , fields)

        //Handle File Here
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error: "File Size Tooo Big...!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        console.log(product);
        //Save To The DB
        product.save((err , product)=>{
            if(err){
                return res.status.json({
                    error: "Updating of Product Failed"
                })
            }
            res.json(product);
        })
    });
}





exports.getAllUniqueCategories = (req , res)=>{
    Product.distinct("category" , {} , (err , category)=>{
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category)
    })
}


exports.updateStock = (req , res , next)=>{
    let myOperations = req.body.order.products.map(prod=>{
        return {
            updateOne: {
                filter: {_id : prod._id},
                update:{$inc: {stock: -prod.count , sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations , {} , (err , products)=>{
        if(err){
            return res.status(400).json({
                err: "Bulk Operation Failed"
            })
        }
        next();       
    })
}

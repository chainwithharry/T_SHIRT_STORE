const Category = require("../models/category")

//Category Getting Middleware
exports.getCategoryById = (req , res , next , id)=>{
    Category.findById(id).exec((err , cate)=>{
        if(err){
            return res.status(400).json({
                error: "Category Not Found In DB"
            })
        }
        req.category = cate;
        next();
    });
    
}

//Category Creating
exports.createCategory = (req, res)=>{
    const category = new Category(req.body);

    category.save((err , category)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        res.json({category});
    });

};


//Category Getting
exports.getCategory = (req , res )=>{
    return res.json(req.category);
}

////Category Getting ALL
exports.getAllCategories = (req , res )=>{
    Category.find().exec((err , categories)=>{
        if(err){
            return res.status(400).json({
                error: "No Categories Found"
            });
        }
        res.json(categories);
    })
}

// Updating Category
exports.updateCategory = (req , res)=>{
    const category = req.category;
    category.name = req.body.name;
    
    category.save((err , updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Failed To Update Category"
            })
        }
        res.json(updatedCategory);
    })


}

// Removing Category
exports.removeCategory = (req , res)=>{
    const category = req.category;

    category.remove((err , category)=>{
        if(err){
            return res.status(400).json({
                error: "Failed To Delete This Memory"
            });
        }
        res.json({
            message: `Sucessfully Deleted ${category}`
        })
    })
}
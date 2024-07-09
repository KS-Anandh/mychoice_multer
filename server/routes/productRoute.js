import express from 'express'
import Product from '../models/productModel.js';
import multer from 'multer';
import path from 'path'

const route = express.Router();

//for getting all products[products are addec from admin panel]
route.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products)
    }
    catch (err) {
        return res.status(200).json(err.message)
    }
})

//for getting products based on category
route.get("/product/category/:category", async (req, res) => {
    const category = req.params.category
    try {
        const products = await Product.find({ productCategory: category });
        return res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json("get method error from server")
    }
})

//for getting product based on object id
route.get("/product/id/:id", async (req, res) => {
    const id=req.params.id
    try {
        const products = await Product.find({})
        const productsById=products.filter((item)=>{
            return item._id==id
        })
        res.status(200).json(productsById[0])
    }
    catch { res.status(500).json("get method error from server") }
})

//for updating product from admin pannel based on object id
route.put("/product/id/:id", async (req, res) => {
    const id = req.params.id
    try {
        const status = await Product.findByIdAndUpdate(id,req.body)
        if (status) {
            return res.status(200).json("Student Data Upadted Successfuly...")
        }
        else {
            return res.status(401).json("Something Went Wrong..")
        }
    }
    catch {
        return res.status(500).json("Update Method Error..")
    }
})

//for remove product in client page from admin pannel based on object id
route.delete("/product/id/:id", async (req, res) => {
    const id = req.params.id
    try {
        const status = await Product.findByIdAndDelete(id)
        if (status) {
            return res.status(200).json("Student Data deleted Successfuly...")
        }
        else {
            return res.status(401).json("Something Went Wrong..")
        }
    }
    catch {
        return res.status(500).json("Update Method Error..")
    }
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images") },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }})
const upload=multer({ storage:storage})

// app.post("/uploads",upload.single('file'),(req,res)=>{
//     const {user}=req.body
//         UserModel.create({image:req.file.filename,name:user})
//         .then(result=>{res.json(result)})
//         .catch(err=>console.log("err"))
// })

//for adding new product from admin pannel
route.post("/product",upload.single('file'),async(req, res) => {
    const {productName,productCategory,productPrice,productRating,productDesc}=req.body;
        try {
          const product= new Product({productName:productName,productCategory:productCategory,productPrice:productPrice,productDesc:productDesc,productRating:productRating,productImg:req.file.filename})
          await product.save()
          return res.status(200).json(product)
        }
        catch (err) {
            return res.status(404).json("get method error from server")
        }
})


//for getting all products by passing array of object id's 
route.post("/product/ids", async (req, res) => {
    const {ids}=req.body;
    try {
        const product = await  Product.find({_id:{$in:ids}});
        return res.status(200).json(product)
    }
    catch (err) {
        return res.status(404).json("get method error from server")
    }

})


export default route;
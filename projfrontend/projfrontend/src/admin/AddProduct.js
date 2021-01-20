import React , {useEffect, useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { createaProduct, getAllCategories } from "./helper/adminapicall";


const AddProduct = ()=>{

const [values , setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getRedirect:false,
    formData:""
});




const {name , description , price , stock , categories , category , loading , error , createdProduct , getRedirect , formData} = values;

const {user , token} = isAuthenticated();

    const preload = () => {
        getAllCategories().then(data=>{
            // console.log(data);
            if(data.error){
                setValues({...values , error: data.error})
            }
            else{
                setValues({...values , categories: data , formData: new FormData() })
                console.log("Cate:", categories);
            }
        })
    }

    useEffect(()=>{
        preload();
    } , [])


    const performRedirect = ()=>{
      if(getRedirect)
        return <Redirect to = "/admin/dashboard"/>;
    }

    const onSubmit = (event)=>{
        event.preventDefault();

        setValues({...values , error:"" , loading:true})
        createaProduct(user._id , token , formData).then(data=>{
          if(data.error){
            setValues({...values , error: data.error})
          }else{
            setValues({
              ...values ,
              name: "",
              description:"",
              price:"",
              photo:"",
              stock:"",
              loading:false,
              getRedirect:true,
              createdProduct: data.name
            })
          }
        })


    }

    const handleChange = name => event=>{
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name , value);
        setValues({...values , [name]:value});
    };

    const successMessage = ()=>(
      <div className = "alert alert-success mt-3" style={{display: createdProduct? "":"none"}}>
          <h4>{createdProduct} created Successfully</h4>
      </div>
    )

    const errorMessage = ()=>(
      <div className = "alert alert-warning mt-3" style={{display: error? "":"none"}}>
          <h4>Can't create the product</h4>
      </div>
    )

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
                {categories && categories.map((cate , index)=>(

                <option key = {index} value = {cate._id}>
                    {cate.name}
                </option>

              ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );
    return (
        <Base title = "" description= "Welcome To Product Creation Section" className="container bg-info p-3 ">
            {/* <h1 className = "text-white">Add Product</h1> */}
            <Link to = "/admin/dashboard" className="btn btn-md btn-dark mb-3" >Go Back</Link>
            <div className = "row bg-dark text-white rounded">
                <div className = "col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>

        </Base>
        
    )
}

export default AddProduct;
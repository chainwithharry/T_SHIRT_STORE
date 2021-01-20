import React, {useImperativeHandle, useState} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";



const AddCategory = ()=>{

    const [name , setName] = useState("")
    const [error , setError] = useState(false)
    const [success , setSuccess] = useState(false)

    const {user , token} = isAuthenticated();

    const goBack = ()=>(
        <div className = "mt-5">
            <Link className = "btn btn-sm btn-success mb-3" to = "/admin/dashboard">
                Go Back
            </Link>
        </div>
    )

    const handleChange = event=>{
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        //Backend Request Fired
        createCategory(user._id , token , {name})
        .then(data=>{
            if(data.error){
                setError(true);
            }
            else{
                setError("");
                setSuccess("true");
                setName("");
            }
        })
    }

    const successMessage = (event)=>{

        if(success) {
            return <h4 className = "text-success">Category {name} Created Succesfully</h4>
        }
        

    }

    const warningMessage = ()=>{
        if(error) {
            return <h4 className = "text-success">Failed to Create Category</h4>
        }
    }

    const myCategoryForm = ()=>(
        <form>
            <div className = "form-group">
                <p className = "lead">
                    Enter The Category
                </p>
                <input type = "text" className = "form-control my-3" autoFocus required placeholder = "For Ex. Summer" onChange = {handleChange} value = {name} />
                <button className = "btn btn-outline-info" onClick = {onSubmit}>
                    Create Category
                </button>
            </div>
        </form>
    );

    return(
        <Base title = "Create A Category Here" description = "Add A New Category For New Tshirts" className = "container bg-info p-4">

            <div className = "row bg-white rounded">
                <div className = "col-md-8 offset-md-2">
                    {successMessage()} {warningMessage()} {myCategoryForm()} {goBack()}
                </div>
            </div>

        </Base>
    );
};

export default AddCategory;
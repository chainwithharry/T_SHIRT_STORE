import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../admin/helper/cartHelper';
import ImageHelper from './helper/ImageHelper';


const Card = ({
    product,
    AddtoCart = true,
    removeFromCart = false,
    setReload = f =>f ,
    //f=>f is function(f){return f}
    reload = undefined
}) => {

  const [redirect , setRedirect] = useState(false);
  const [count , setcount] = useState(product.count);


  const cardTitle= product ? product.name : "A Photo From Pexel";
  const cardDescription= product ? product.description : "Default Description";
  const cardPrice= product ? product.price : "Default";

  const getARedirect = (redirect) =>{
    if(redirect){
      return <Redirect to = "/cart"/>
    }
  }

  const AddToCart = ()=>{
    addItemToCart(product , ()=> setRedirect(true))
  }

  const showAddToCart = (AddtoCart)=>{
    return(
    AddtoCart && (<button
      onClick={AddToCart}
      className="btn btn-block btn-outline-success mt-2 mb-2"
    >
      Add to Cart
    </button>)
    )
  }

  const showRemoveFromCart = (removeFromCart)=>{

    return(
      removeFromCart && (<button
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload)

        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>)
    )


  }
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
         {getARedirect(redirect)}
            <ImageHelper product = {product} />
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(AddtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;
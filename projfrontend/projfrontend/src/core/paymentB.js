import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "../admin/helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
// import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userid = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userid, token) => {
    getMeToken(userid, token).then((info) => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBTDropIn = () => {
    return (
      <div>
          {info.clientToken !== null && products.length > 0 ? (
            <div>
                <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={instance => (info.instance = instance)}
                />
                <button className = "btn btn-block btn-success"onClick={onPurchase}>Buy</button>
            </div>
          ):(<h3>Please Login or Add Something To Cart</h3>)}
      </div>
    );
  };

  useEffect(() => {
    getToken(userid, token);
  }, []);


  
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info?.instance?.requestPaymentMethod()?.then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userid, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          cartEmpty(()=>{
            
          })
          //TODO: force reload
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };



  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>
      {showBTDropIn()}
    </div>
  );
}

export default Paymentb;

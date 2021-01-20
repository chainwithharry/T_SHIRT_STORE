const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "vd52fy846wxspmvm",
  publicKey: "5gxjwkkchzbwnryx",
  privateKey: "75420d26fe5b762725765bc137d34e4b"
});

exports.getToken = (req , res)=>{

    gateway.clientToken.generate({
        
      }, (err, response) => {
        // pass clientToken to your front-end
        if(err){
            res.status(400).send(err);
        }else{
            res.send(response);
        }
      });

}

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};

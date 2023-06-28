const {stripe} = require("../utils/stripe");

class PaymentControler{
async getBalance(req,res){
    try {
      const balance =  await  stripe.balance.retrieve();
    const myBalance = (balance.available[0].amount/100).toFixed(2)
    const pending= (balance.pending[0].amount/100).toFixed(2)
       res.status(200).json({message:{balance:myBalance,pending_balance:pending }})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error,success:false})
    }
}
}
module.exports = new PaymentControler( )

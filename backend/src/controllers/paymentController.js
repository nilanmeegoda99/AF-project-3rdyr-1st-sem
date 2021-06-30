import Payment from "../models/paymentModel.js";

// @desc  Create Payment
// @route POST /api/payments
// @access Public Authorized User

const createPayment = async(req, res) => {

    var today = new Date();
    var cdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var ctime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if(req.body){
        const paymentDetails = {
            details: req.body.details,
            type: req.body.type,
            date: cdate,
            time: ctime,
            amount: req.body.amount,
            user: req.body.user,
            research: req.body.research,
            booking: req.body.booking,
        };

        // console.log(paymentDetails)

        const payment = new Payment(paymentDetails)
        
        await payment.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Payment Created Successfully!", paymentDetails: data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get Payment by Id
// @route GET /api/payments/:id
// @access Public Authorized User

const getPaymentById = async(req, res) => {

    if(req.params.id && req.params){
        await Payment.findById(req.params.id).populate('user')
        .then( data => {
            res.status(200).send({ success: true, 'payment': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "no data found" })
    }
}

export default{
    createPayment,
    getPaymentById,
}
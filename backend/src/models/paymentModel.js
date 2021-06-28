import mongoose from 'mongoose';

const PaymentModel = mongoose.Schema({

    details: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
        
});

const Payment = mongoose.model('payment', PaymentModel);
export default Payment;
import mongoose from 'mongoose';

const PaymentModel = mongoose.Schema({

    details: {
        type: String,
        required: true,
    },
    type: {
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
    research:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'research'
    },
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'booking'
    },
        
});

const Payment = mongoose.model('payment', PaymentModel);
export default Payment;
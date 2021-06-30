import mongoose from 'mongoose';

const BookingModel = mongoose.Schema({

    token: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'payment'
    },
    conference:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'conference'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
        
});

const Booking = mongoose.model('booking', BookingModel);
export default Booking;
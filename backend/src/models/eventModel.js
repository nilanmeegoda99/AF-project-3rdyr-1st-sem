import mongoose from 'mongoose';

const eventModel = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    is_Approved : {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    otherDetails: {
        type: String,
        required: false,
    },
    conference: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'conference'
    }
        
});

const Event = mongoose.model('event', eventModel);
export default Event;
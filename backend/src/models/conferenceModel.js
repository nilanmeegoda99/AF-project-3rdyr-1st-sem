import mongoose from 'mongoose';

const conferenceModel = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
        required: false,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
        
});

const Conference = mongoose.model('conference', conferenceModel);
export default Conference;
import mongoose from 'mongoose';

const WorkshopModel = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
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
    is_Approved:{
        type: Boolean,
        required: true,
    },
    attachment:{
        type: String,
        required: true,
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

const Workshop = mongoose.model('workshop', WorkshopModel);
export default Workshop;
import mongoose from 'mongoose';

const ResearchModel = mongoose.Schema({

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
    is_Paid:{
        type: Boolean,
        required: true,
    },
    completed:{
        type: Boolean,
        required: true,
    },
    attachment:{
        type: String,
        required: true,
    },
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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

const Research = mongoose.model('Research', ResearchModel);
export default Research;
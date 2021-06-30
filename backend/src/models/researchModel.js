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
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    is_Approved:{
        type: Boolean,
        required: false,
    },
    is_Paid:{
        type: Boolean,
        required: false,
    },
    completed:{
        type: Boolean,
        required: false,
    },
    attachment:{
        type: String,
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

const Research = mongoose.model('Research', ResearchModel);
export default Research;
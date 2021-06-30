import mongoose from 'mongoose';

const downloadMaterialsModel = mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        
});

const Download_Material = mongoose.model('downloadable_materials', downloadMaterialsModel);
export default Download_Material;
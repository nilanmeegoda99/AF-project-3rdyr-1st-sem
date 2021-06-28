import Download_Material from "../models/download_materials_model.js";

// @desc  Create Material
// @route POST /api/materials
// @access Admin Reviewer

const createMaterial = async(req, res) => {

    if(req.body){

        const material = new Download_Material(req.body)
        
        await material.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Material Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Materials
// @route GET /api/materials
// @access Public Authorized User

const getAllMaterials = async(req, res) => {

    await Download_Material.find({})
    .then( data => {
        res.status(200).send({ success: true, 'materials': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}


// @desc  Delete Material
// @route Delete /api/materials:id
// @access Public Authorized User

const deleteMaterial = async(req, res) => {

    if(req.params && req.params.id){
        
        await Download_Material.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(201).send({ success: true, 'message': "Material Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

export default{
    createMaterial,
    getAllMaterials,
    deleteMaterial,
}
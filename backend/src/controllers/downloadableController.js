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

    await Download_Material.find({}).populate('conference')
    .then( data => {
        res.status(200).send({ success: true, 'materials': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get Material by Id
// @route GET /api/materials/:id
// @access Public Authorized User

const getMaterialById = async(req, res) => {

    if(req.params && req.params.id){
        await Download_Material.findById(req.params.id).populate('conference')
        .then( data => {
            res.status(200).send({ success: true, 'material': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'error': "Id not found" })
    }
}


// @desc  Delete Material
// @route Delete /api/materials:id
// @access Public Authorized User

const deleteMaterial = async(req, res) => {

    if(req.params && req.params.id){
        
        await Download_Material.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Material Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}


// @desc  Get Material by conference id
// @route GET /api/materials/conference:id
// @access Public Authorized User

const getMaterialByConferenceId = async(req, res) => {

    if(req.params && req.params.id){
        await Download_Material.find( { "conference": req.params.id } )
        .then( data => {
            res.status(200).send({ success: true, 'materials': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'error': "Id not found" })
    }
}

export default{
    createMaterial,
    getAllMaterials,
    getMaterialById,
    deleteMaterial,
    getMaterialByConferenceId,
}
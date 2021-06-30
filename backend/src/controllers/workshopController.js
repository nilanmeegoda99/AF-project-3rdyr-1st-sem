import Workshop from "../models/workshopModel.js";

// @desc  Create Workshop
// @route POST /api/workshops
// @access Public Workshop Coordinator

const createWorkshop = async(req, res) => {

    if(req.body){
        const workshopDetails = {
            title: req.body.title,
            description: req.body.description,
            conference: req.body.conference,
            attachment: req.body.attachment,
            user: req.body.user,
            is_Approved: false,
        };

        const workshop = new Workshop(workshopDetails)
        
        await workshop.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Workshop Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Workshops
// @route GET /api/workshops
// @access Admin Reviewer

const getAllWorkshops = async(req, res) => {

    await Workshop.find({}).populate("conference")
    .then( data => {
        res.status(200).send({ success: true, 'workshops': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get Workshop by ID
// @route GET /api/workshops:id
// @access Public Workshop Coordinator

const getWorkshopByID = async(req, res) => {

    if(req.params && req.params.id){
        
        await Workshop.findById(req.params.id).populate("conference").populate("user")
        .then( data => {
            res.status(200).send({ success: true, 'workshop': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "Id Not Found" })
    }
}


// @desc  Update Workshop
// @route PUT /api/workshops:id
// @access Public Workshop Coordinator

const updateWorkshopDetails = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            title: req.body.title,
            description: req.body.description,
         };
        
        await Workshop.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Workshop Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Delete Workshop
// @route Delete /api/workshops:id
// @access Public Workshop Coordinator

const deleteWorkshopDetails = async(req, res) => {

    if(req.params && req.params.id){
        
        await Workshop.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Workshop Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

// @desc  Approve Workshop
// @route Put /api/workshops:id
// @access Admin Reviewer

const approveWorkshop = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "is_Approved": req.body.is_Approved,
            "date": req.body.date,
            "time": req.body.time,
         };
        
        await Workshop.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Workshop Approved Status Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}


// @desc  Get All Workshops by user
// @route GET /api/workshops/user/:id
// @access Public Workshop Coordinator

const getAllWorkshopsByUser = async(req, res) => {

    if(req.params && req.params.id){
        await Workshop.find({ "user": req.params.id}).populate('conference')
        .then( data => {
            res.status(200).send({ success: true, 'workshops': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(500).send({ success: false, 'message': error })
    }
}

export default{
    createWorkshop,
    getAllWorkshops,
    getWorkshopByID,
    updateWorkshopDetails,
    deleteWorkshopDetails,
    approveWorkshop,
    getAllWorkshopsByUser,
}
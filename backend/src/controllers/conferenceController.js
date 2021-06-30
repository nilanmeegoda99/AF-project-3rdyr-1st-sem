import Conference from "../models/conferenceModel.js";

// @desc  Create Conference
// @route POST /api/conferences/
// @access Admin Super Admin

const createConference = async(req, res) => {

    if(req.body){
        const conference = new Conference(req.body)
        
        await conference.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Conference Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Conferences
// @route GET /api/conferences/
// @access Admin Super Admin

const getAllConferences = async(req, res) => {

    await Conference.find({})
    .then( data => {
        res.status(200).send({ success: true, 'conferences': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get Conferences by ID
// @route GET /api/conferences/:id
// @access Admin Super Admin

const getConferenceByID = async(req, res) => {

    if(req.params && req.params.id){
        
        await Conference.findById(req.params.id)
        .then( data => {
            res.status(200).send({ success: true, 'conference': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "Id Not Found" })
    }
}


// @desc  Update Conference
// @route PUT /api/conferences/:id
// @access Admin Super Admin

const updateConferenceDetails = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "title": req.body.title,
            "venue": req.body.venue,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "description": req.body.description,
         };
        
        await Conference.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Conference Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Delete Conference
// @route Delete /api/conferences/:id
// @access Admin Super Admin

const deleteConferenceDetails = async(req, res) => {

    if(req.params && req.params.id){
        
        await Conference.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Conference Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

// @desc  Active Conference
// @route POST /api/conferences/approve/:id
// @access Admin Super Admin

const activeConference = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "active": req.body.active,
         };
        
        await Conference.update( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get Active Conference
// @route GET /api/conferences/active
// @access Admin Super Admin

const getActiveConference = async(req, res) => {

    await Conference.findOne({ "active": true })
    .then( data => {
        res.status(200).send({ success: true, 'conference': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
 
}

export default{
    createConference,
    getAllConferences,
    getConferenceByID,
    updateConferenceDetails,
    deleteConferenceDetails,
    activeConference,
    getActiveConference,
}
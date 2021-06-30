import Event from "../models/eventModel.js";

// @desc  Create Event
// @route POST /api/events
// @access Admin Editor

const createEvent = async(req, res) => {

    if(req.body){
        const eventDetails = {
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.startDate,
            description: req.body.description,
            otherDetails: req.body.otherDetails,
            conference: req.body.conference,
            is_Approved: false,
        };

        const event = new Event(eventDetails)
        
        await event.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Event Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Events
// @route GET /api/events
// @access Admin Editor

const getAllEvents = async(req, res) => {

    await Event.find({}).populate('conference')
    .then( data => {
        res.status(200).send({ success: true, 'events': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get Event by ID
// @route GET /api/events:id
// @access Admin Editor

const getEventByID = async(req, res) => {

    if(req.params && req.params.id){
        
        await Event.findById(req.params.id).populate('conference')
        .then( data => {
            res.status(200).send({ success: true, 'event': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "Id Not Found" })
    }
}


// @desc  Update Event
// @route PUT /api/events:id
// @access Admin Editor

const updateEventDetails = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            otherDetails: req.body.otherDetails,
         };
        
        await Event.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Event Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Delete Event
// @route Delete /api/events:id
// @access Admin Editor

const deleteEventDetails = async(req, res) => {

    if(req.params && req.params.id){
        
        await Event.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Event Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

// @desc  Approve Event
// @route Put /api/events:id
// @access Super Admin

const approveEvent = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "is_Approved": req.body.is_Approved,
         };
        
        await Event.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Event Approved Status Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}


// @desc  Get Conference Events
// @route GET /api/events/conference/:id
// @access Admin Super Admin

const getEventsByConference = async(req, res) => {

    if(req.params.id && req.params){

        await Event.find({ "conference": req.params.id, "is_Approved": true, })
        .then( data => {
            res.status(200).send({ success: true, 'events': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "No Id found" })
    }
 
}

export default{
    createEvent,
    getAllEvents,
    getEventByID,
    updateEventDetails,
    deleteEventDetails,
    approveEvent,
    getEventsByConference,
}
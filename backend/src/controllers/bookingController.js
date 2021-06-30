import Booking from "../models/bookingModel.js";

// @desc  Create Booking
// @route POST /api/bookings
// @access Public Authorized User

const createBooking = async(req, res) => {

    var generatedToken = "ICAF"+Date.now();

    if(req.body){
        const bookingDetails = {
            // isPaid: generateToken(),
            token: generatedToken,
            isPaid: false,
            date: req.body.date,
            status: "Incomplete",
            user: req.body.user,
            payment: null,
            conference: req.body.conference
        };

        const booking = new Booking(bookingDetails)
        
        await booking.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Booking Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Bookings
// @route GET /api/bookings
// @access Public Authorized User

const getAllBookings = async(req, res) => {

    await Booking.find({})
    .then( data => {
        res.status(200).send({ success: true, 'bookings': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get All Bookings by User Id
// @route GET /api/bookings/user/:id
// @access Public Authorized User

const getAllBookingsByUserId = async(req, res) => {

    if(req.params.id && req.params){
        await Booking.find({ user: req.params.id }).populate('conference')
        .then( data => {
            res.status(200).send({ success: true, 'bookings': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "no data found" })
    }
}

// @desc  Get Booking by Id
// @route GET /api/bookings/:id
// @access Public Authorized User

const getBookingById = async(req, res) => {

    if(req.params.id && req.params){
        await Booking.findById(req.params.id).populate('conference').populate('user')
        .then( data => {
            res.status(200).send({ success: true, 'booking': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "no data found" })
    }
}

// @desc  update Payment Details Booking by Id
// @route GET /api/bookings/pay/:id
// @access Public Authorized User

const setPaidDetails = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "isPaid": true,
            "payment": req.body.payment,
            "status": "Complete",
         };
        
        await Booking.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Booking Details Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}


// @desc  Delete Booking
// @route Delete /api/bookings:id
// @access Public Authorized User

const deleteBooking = async(req, res) => {

    if(req.params && req.params.id){
        
        await Booking.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Booking Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

export default{
    createBooking,
    getAllBookings,
    deleteBooking,
    getBookingById,
    getAllBookingsByUserId,
    setPaidDetails,
}
import Booking from "../models/bookingModel.js";

// @desc  Create Booking
// @route POST /api/bookings
// @access Public Authorized User

const createBooking = async(req, res) => {

    if(req.body){
        const bookingDetails = {
            // token: generateToken(),
            // isPaid: generateToken(),
            token: "ABC121",
            isPaid: false,
            date: req.body.date,
            status: "Incomplete",
            time: req.body.time,
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


// @desc  Delete Booking
// @route Delete /api/bookings:id
// @access Public Authorized User

const deleteBooking = async(req, res) => {

    if(req.params && req.params.id){
        
        await Booking.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(201).send({ success: true, 'message': "Booking Deleted Successfully!" })
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
}
import Notification from "../models/notificationModel.js";

// @desc  Create Notification
// @route POST /api/notifications
// @access Admin Reviewer

const createNotification = async(req, res) => {

    if(req.body){

        const notification = new Notification(req.body)
        
        await notification.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Notification Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Notifications
// @route GET /api/notifications
// @access Public Authorized User

const getAllNotifications = async(req, res) => {

    await Notification.find({})
    .then( data => {
        res.status(200).send({ success: true, 'notifications': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get All Notifications by USerID
// @route GET /api/notifications/user/:id
// @access Public Authorized User

const getNotificationsByUserID = async(req, res) => {

    if(req.params && req.params.id){
        await Notification.find({ "user": req.params.id })
        .then( data => {
            res.status(200).send({ success: true, 'notifications': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "No data found" })
    }

}


// @desc  Delete Notification
// @route Delete /api/notifications:id
// @access Public Authorized User

const deleteNotification = async(req, res) => {

    if(req.params && req.params.id){
        
        await Notification.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(201).send({ success: true, 'message': "Notification Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

export default{
    createNotification,
    getAllNotifications,
    deleteNotification,
    getNotificationsByUserID,
}
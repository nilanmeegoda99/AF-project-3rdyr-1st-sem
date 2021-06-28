import mongoose from 'mongoose';

const NotificationModel = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
        
});

const Notification = mongoose.model('notification', NotificationModel);
export default Notification;
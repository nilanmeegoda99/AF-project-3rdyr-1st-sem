import mongoose from 'mongoose'

const userModel = mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      contact_no: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      user_type: {
        type: String,
        required: true,
        
      },

    }, {
        timestamps: true

})

const User = mongoose.model('users', userModel)
export default User
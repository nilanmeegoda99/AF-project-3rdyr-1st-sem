import mongoose from 'mongoose'

const conferenceModel = mongoose.Schema(
    {

    }
)

const Conference = mongoose.model('conference', conferenceModel)
export default Conference
import Research from "../models/researchModel.js";

// @desc  Create Research
// @route POST /api/researches
// @access Public Researcher

const createResearch = async(req, res) => {

    if(req.body){
        const researchDetails = {
            title: req.body.title,
            description: req.body.description,
            conference: req.body.conference,
            attachment: req.body.attachment,
            user: req.body.user,
            is_Approved: false,
            is_Paid: false,
            completed: false,
        };

        const research = new Research(researchDetails);
        
        await research.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Research Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Get All Researches
// @route GET /api/researches
// @access Public Researcher

const getAllResearches = async(req, res) => {

    await Research.find({}).populate('conference')
    .then( data => {
        res.status(200).send({ success: true, 'researches': data })
    })
    .catch( (error) => {
        res.status(500).send({ success: false, 'message': error })
    } )
}

// @desc  Get Research by ID
// @route GET /api/researches:id
// @access Public Researcher

const getResearchByID = async(req, res) => {

    if(req.params && req.params.id){
        
        await Research.findById(req.params.id).populate("conference").populate("user")
        .then( data => {
            res.status(200).send({ success: true, 'research': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "Id Not Found" })
    }
}


// @desc  Update Research
// @route PUT /api/research:id
// @access Public Researcher

const updateResearchDetails = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            title: req.body.title,
            description: req.body.description,
         };
        
        await Research.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Research Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Delete Research
// @route Delete /api/researches:id
// @access Public Researcher

const deleteResearchDetails = async(req, res) => {

    if(req.params && req.params.id){
        
        await Research.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Research Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

// @desc  Approve Research
// @route Put /api/researches/:id
// @access Admin Reviewer

const approveResearch = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "is_Approved": req.body.is_Approved,
            "date": req.body.date,
            "time": req.body.time,
         };
        
        await Research.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Research Approved Status Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}


// @desc  Get All Researches by user
// @route GET /api/researches/user/:id
// @access Public Researches Coordinator

const getAllResearchesByUser = async(req, res) => {

    if(req.params && req.params.id){
        await Research.find({ "user": req.params.id}).populate('conference')
        .then( data => {
            res.status(200).send({ success: true, 'researches': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(500).send({ success: false, 'message': error })
    }
}

// @desc  Complete Research
// @route Put /api/researches/complete/:id
// @access Admin Reviewer

const completeResearch = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "completed": req.body.completed,
         };
        
        await Research.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Research Completed Status Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

// @desc  Complete Payment
// @route Put /api/researches/paid/:id
// @access Admin Reviewer

const completePayment = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            "is_Paid": true,
            "payment": req.params.payment,
         };
        
        await Research.updateOne( query , update)
        .then( result => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'message': "Research Payment Updated Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}


// @desc  Get researches fro public
// @route get /api/researches/public/
// @access Admin Reviewer

const getResearchesForPublic = async(req, res) => {

    if(req.body && req.params){

        await Research.find({ "conference": req.params.id ,"completed": true })
        .then( data => {
            // console.log(result.modifiedCount);
            res.status(200).send({ success: true, 'researches': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

export default{
    createResearch,
    getAllResearches,
    getResearchByID,
    updateResearchDetails,
    deleteResearchDetails,
    approveResearch,
    getAllResearchesByUser,
    completeResearch,
    completePayment,
    getResearchesForPublic,
}
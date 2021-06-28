import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken  from '../utils/genarateToken.js'


// @desc  Fetch validate the user credentials and then send a token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact_no:user.contact_no,
      user_type: user.user_type,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Entered Credentials are not correct')
  }
})

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private

const getUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        contact_no:user.contact_no,
        user_type: user.user_type,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User cannot be found')
    }
  })
  
  // @desc  Add a new user
  // @route POST /api/users/
  // @access Public
  
  const createUser = asyncHandler(async (req, res) => {
    const { name, email, password,contact_no,user_type } = req.body
  
    const chk_user_existence = await User.findOne({ email: email })
  
    if (chk_user_existence) {
      res.status(400)
      throw new Error(`There's a member already registered with that mail`)
    }
  
    const user = await User.create({
      name,
      email,
      password,
      contact_no,
      user_type,

    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        contact_no: user.contact_no,
        user_type: user.user_type,

        isAdmin: user.isAdmin,
        
      })
    } else {
      res.status(400)
      throw new Error('This user account cannot be created. Try again')
    }
  })
  
  // @desc  To Update user profile
  // @route PUT /api/users/userAccount
  // @access Private
  
  const updateUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: genToken(updatedUser._id),
      })
  
  
    } else {
      res.status(404)
      throw new Error('User cannot be found')
    }
  })
  
  
  
  // @desc  Get request to all users
  // @route PUT /api/users
  // @access Private/ admin
  
  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  
    
  })
  
  export {  getUserAccount, createUser, updateUserAccount, getUsers, authUser }
  
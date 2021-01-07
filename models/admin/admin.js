'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
  user_name: String,
  password: String,
  identity_num: String,
  id: String,
  create_time: String,
  email: String,
  phone_number: String,
  avatar: { type: String, default: 'default.jpg' }
})

adminSchema.index({ id: 1 })

const Admin = mongoose.model('Admin', adminSchema)

export default Admin

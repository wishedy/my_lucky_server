'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
  user_name: String,
  password: String,
  identity_num: String,
  id: String,
  gender: Number, // 0女1男
  create_time: String,
  email: String,
  phone_number: String,
  grade: Number, // 1:普通管理、 2:超级管理员
  avatar: { type: String, default: 'default.jpg' }
})

adminSchema.index({ id: 1 })

const Admin = mongoose.model('Admin', adminSchema)

export default Admin

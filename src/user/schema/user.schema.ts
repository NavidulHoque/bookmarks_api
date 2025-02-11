/* eslint-disable prettier/prettier */

import * as mongoose from "mongoose";
import * as argon from "argon2";

export const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, 'Password must be at least 8 characters long'],
    match: [
      /^(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must contain at least one number and one special character',
    ],
  } 

}, { timestamps: true })

UserSchema.pre('save', async function(next) {

  const hashedPassword = await argon.hash(this.password)
  this.password = hashedPassword
  next()
})


// UserSchema.methods.comparePassword = async function (plainPassword, hashedPassword) {

//     const isMatched = await argon.verify(plainPassword, hashedPassword)

//     return isMatched
// }

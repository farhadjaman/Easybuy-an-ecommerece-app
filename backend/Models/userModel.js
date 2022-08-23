import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const userschema = new mongoose.Schema
  ({
    name: {
      type: String,
      required: [true, 'must have a name'],
      trim: true,
      maxlength: [40, 'must have a name of maximum 40 charecters'],
      minlength: [10, ' must have a name of minimum 10 charecters']


    },
    email: {
      type: String,
      required: [true, 'must have an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'must have a password'],
      unique: true
    },
    isAdmin: {
      type: Boolean,
      required: [true],
      default: false
    },
  }, {
    timestamps: true
  })

userschema.methods.matchPassword = async function (enteredPassword) {
  const result = await bcrypt.compare(enteredPassword, this.password)
  return result
}

// userschema.pre(["save", "findByIdAndUpdate"], async function (next) {
//   console.log("coming here")
//   if (!this.isModified('password')) {
//     next()
//   }
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

const User = mongoose.model('User', userschema);

export default User;
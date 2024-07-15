import mongoose from 'mongoose'
import { title } from 'process'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
        type: Date,
        default: Date.now
    },
  favoriteVideos: [{
    title: String,
    url: String,
    thumbnail: String,
  }]
})

const User = mongoose.model('User', UserSchema)

export default User
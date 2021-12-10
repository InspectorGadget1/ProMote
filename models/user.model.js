import mongoose from 'mongoose'

const User = new mongoose.Schema ({
    name:{type: String, required: true},
    username:{type: String,unique: true, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    phone:{type: String, required: true},
    dateOfBirth:{type: Date, required: true},
    gender:{type: String, required: true},
    role:{type: String, ref: 'Role', default : 'USER'}
})
export default mongoose.model('User', User);

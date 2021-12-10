import mongoose from 'mongoose'

const Order = new mongoose.Schema ({
    name:{type: String, required: true},
    link:{type: String, required: true},
    product:{type: String, required: true},
    budget:{type: String, required: true},
    created:{type: Date, required: true},
    finished:{type: Date, required: false},
    comment:{type: String, required: false},
    user:{type: String,required: true}
})
export default mongoose.model('Order', Order);


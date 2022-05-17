const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    price: {type: String, required:true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref:'User'}
})

module.exports = model('Item', schema)
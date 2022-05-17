const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    status: {type: String, required: true, default: 'Set status'},
    avatar: {type: String, required: true, default: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'},
    owner: {type: Types.ObjectId, ref:'User'}
})

module.exports = model('Profile', schema)
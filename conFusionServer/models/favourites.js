const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouritesSchema = new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
},
{
    timestamps: true
});

var Favourites = mongoose.model('favourites', favouritesSchema);

module.exports = Favourites;
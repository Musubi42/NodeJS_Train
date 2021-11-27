const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    description: [
        {
            productID: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true}, // L'objet contiendra toutes les infos d'une adresse Rue, Ville, Pays ...
    status: { type: String, default: 'pending'}
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);
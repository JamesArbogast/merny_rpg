
const mongoose = require("mongoose");

/* 
{PATH} will be replaced with the field name, such as "location".
*/
const CharacterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [2, "{PATH} must be at least {MINLENGTH} characters."],
        },
        characterClass: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },
        attack: {
            type: Number,
            default: 0,
            required: [true, "{PATH} is required."]
        },
        defense: {
            type: Number,
            default: 0,
            required: [true, "{PATH} is required."]
        },
        magic: {
            type: Number,
            default: 0,
            required: [true, "{PATH} is required."]
        },
        imgUrl: {
            type: String,
            required: [true, "{PATH} is required."],
        },
        items: {
            type: Array,
            required: [true, "{PATH} is required."]
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

/* 
Register schema with mongoose and provide a string to name the collection. This
also returns a reference to our model that we can use for DB operations.
*/
const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;
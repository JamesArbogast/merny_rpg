const Character = require("../models/character.model");

// Export an object that is full of methods.
module.exports = {
  // long-form - key: value format
    create: function (req, res) {
        console.log("create method executed");

        Character.create(req.body)
        .then((character) => {
            // newly created DB model instance
            res.json(character);
        })
        .catch((err) => {
            // This makes the front-end axios .catch get triggered instead of the .then.
            res.status(400).json(err);
        });
    },

    // Shorthand key value pair, key name will be the name of the function and value will be the function.
    getAll(req, res) {
        console.log("getAll method executed");

        Character.find()
        .then((characters) => {
            res.json(characters);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    getOne(req, res) {
        console.log("getOne method executed", "url params", req.params);

        Character.findById(req.params.id)
        .then((character) => {
            res.json(character);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    delete(req, res) {
        console.log("delete method executed", "url params", req.params);

        Character.findByIdAndDelete(req.params.id)
        .then((character) => {
            res.json(character);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    update(req, res) {
        console.log("update method executed", "url params:", req.params);

        Character.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true, // return the newly updated model
        })
        .then((updatedCharacter) => {
            res.json(updatedCharacter);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
};
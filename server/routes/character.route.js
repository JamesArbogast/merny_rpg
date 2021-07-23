const characterController = require("../controllers/character.controller");

/*
LEADING SLASH REQUIRED in routes!
Export a function to be called in server.js where the app will be passed in.
*/
module.exports = (app) => {
  // When one of these URLS is visited, execute the corresponding method.
    app.post("/api/characters", characterController.create);
    app.get("/api/characters", characterController.getAll);
    app.get("/api/characters/:id", characterController.getOne);
    app.delete("/api/characters/:id", characterController.delete);
    app.put("/api/characters/:id", characterController.update);
};
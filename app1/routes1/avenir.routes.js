module.exports = (app) => {
    const avenir = require('../controllers1/avenir.controller.js');

    // Create a new Note
    app.post('/avenir', avenir.create);

    // Retrieve all Notes
    app.get('/avenir', avenir.findAll);

    // Retrieve a single Note with noteId
    app.get('/avenir/:avenirId', avenir.findOne);

    // Update a Note with noteId
    app.put('/avenir/:avenirId', avenir.update);

    // Delete a Note with noteId
    app.delete('/avenir/:avenirId', avenir.delete);
}
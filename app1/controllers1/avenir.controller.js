const Note = require('../models1/avenir.model.js');
const Joi = require('joi');//validation purpose
const _ = require('lodash')

  function validateParam(note) {
    const schema = {
        Name : Joi.string().min(5).required(),
        Account_Name : Joi.string().required(),
        Email: Joi.string().required(),
        Phonenumber : Joi.string().min(10).required()
    };
    return Joi.validate(note, schema);
}

exports.create = (req, res) =>
 {
    // Validate request
    const result = validateParam(req.body)
      if(result.error)
    {

        res.status(400).send(result.error.details[0].message);
        //res.status(400).send('Al fields are mandatory, missing some fields, please check...');
        return;
    }

    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }


    // Create a Note
    const note = new Note({
        Name: req.body.Name, //|| "Untitled Note", 
        Account_Name : req.body.Account_Name,
        Email: req.body.Email,
        Phonenumber:req.body.Phonenumber

    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(_.pick(note, ['Name','Account_Name','Email','Phonenumber']));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    var usersProjection = { 
        __v: false,
        _id: false
    };
    Note.find({}, usersProjection)
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    const result = validateParam(req.body)
      if(result.error)
    {

        res.status(400).send(result.error.details[0].message);
        //res.status(400).send('Al fields are mandatory, missing some fields, please check...');
        return;
    }

    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.avenirId, {
        Name: req.body.Name, //|| "Untitled Note", 
        Account_Name : req.body.Account_Name,
        Email: req.body.Email,
        Phonenumber:req.body.Phonenumber
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.avenirId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.avenirId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.avenirId
        });
    });
};

// Delete a note with the specified avenirId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.avenirId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.avenirId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.avenirId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.avenirId
        });
    });
};
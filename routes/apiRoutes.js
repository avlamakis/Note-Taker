// Dependencies
const router = require('express').Router();

const saveInfo = require('../db/saveInfo');

// GET request
router.get('/notes', function (req, res) {
    saveInfo
        .retrieveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// POST request
router.post('/notes', (req, res) => {
    saveInfo
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});


//Delete Notes
router.delete('/notes/:id', function (req, res) {
    saveInfo
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});


module.exports = router;
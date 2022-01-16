//Dependencies
const path = require('path');
const router = require('express').Router();

//Get Requests
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Get request used to send client back to main page if nothing is found
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Export
module.exports = router;
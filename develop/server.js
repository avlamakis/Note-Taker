//Dependencies
const express = require('express');

//Point Server to the route files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Create an express server
const app = express();

//Set PORT for 3001 to run on local host
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//Listener
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});
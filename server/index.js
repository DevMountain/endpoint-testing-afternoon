const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// === GET ENDPOINTS ======

// Get all users / search for users by name, city, state, phone, email
app.get('/api/users', mainCtrl.getUsers);
// Get user by id
app.get('/api/users/:id', mainCtrl.getUserById);

// === PUT ENDPOINTS ======

// Update user info
app.put('/api/users/:id', mainCtrl.updateUserById);

// === POST ENDPOINTS ======

// Create new user
app.post('/api/users', mainCtrl.createUser);

// === DELETE ENDPOINTS ====

// Delete user
app.delete('/api/users/:id', mainCtrl.deleteUserById)




const PORT = 3535;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
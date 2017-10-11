// User data
let users = require('./mockData/users.json');
let lastGivenId = 100;
const idGenerator = () => {
    return ++lastGivenId;
}

module.exports = {
    getUsers(req, res) {
        const qObj = req.query;
        function findUsers( input, prop ) {
            const re = new RegExp(input.toLowerCase());
            return users.filter( user => {
              return user[prop].toLowerCase().match(re)
            }) 
        }
        if (qObj.firstName) {
            const returnedValue = findUsers(qObj.firstName, 'first_name');
            if (returnedValue.length === 0) {
                return res.status(404).send('No match found.')
            }
            return (res
                    .status(200)
                    .send(returnedValue))
          } else if (qObj.lastName) {
                const returnedValue = findUsers(qObj.lastName, 'last_name');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.city) {
                const returnedValue = findUsers(qObj.city, 'city');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.email) {
                const returnedValue = findUsers(qObj.email, 'email');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.state) {
                const returnedValue = findUsers(qObj.state, 'state');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if ( qObj.phone) {
                const returnedValue = findUsers(qObj.phone, 'phone');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (Object.keys(qObj).length !== 0) {
            return res    
                    .status(400)
                    .send(`Improper query sent in request: ${Object.keys(qObj)[0]}=${qObj[Object.keys(qObj)[0]]}`)
          }
        res.status(200).send(users);
    },
    getUserById(req, res) {
        const userId = parseInt(req.params.id);
        if (!userId || typeof userId !== 'number') return res.status(400).send('User id sent must be a number')
        const user = users.filter( (user) => user.id === userId);
        res.status(200).send(user);
    },
    updateUserById(req, res) {
        const id = parseInt(req.params.id);
        if (!id || typeof id !== 'number') {
            return res.status(400)
                        .send('Error with user ID in request.')
        }
        for ( let i = 0 ; i < users.length; i++ ) {
            if (users[i].id === id) {
                const newUserInfo = {};
                for ( let prop in req.body) {
                    if (users[i].hasOwnProperty(prop)) {
                        newUserInfo[prop] = req.body[prop];
                    }
                }
                users[i] = Object.assign(users[i], newUserInfo);
                return res.status(200).send([users[i]]);
            }
        }
        return res.status(404).send('User not found.');
    },
    createUser(req, res) {
        const user = req.body;
        if (!user.first_name || !user.last_name || !user.email || !user.city || !user.state || !user.phone) {
            return res.status(400).send('All needed user info was not sent in the body of request.');
        }
        const newUser = {
            "id": idGenerator(),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "city": user.city,
            "state": user.state,
            "phone": user.phone
          }
          users.push(newUser);
          return res.status(200).send([users[users.length - 1]])
    },
    deleteUserById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id) || typeof id !== 'number' || !id) {
            return res.status(400)
                        .send('Error with user ID in request.')
        }
        let removedUser = `No user with an ID of ${id}.`;
        users = users.filter( user => {
            if (user.id === id) removedUser = user;
            return user.id !== id;
        })
        if (typeof removedUser === 'string') {
            return res.status(404).send(removedUser);
        }
        return res.status(200).send([removedUser]);
    }
}
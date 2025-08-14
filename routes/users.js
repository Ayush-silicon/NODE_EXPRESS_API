import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [
    {
        firstName: "Ayush",
        lastName: "Singh",
        age: 20,
        id: uuidv4()
    },
    {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        id: uuidv4()
    }
];

// GET all users
router.get('/', (req, res) => {
    console.log(users);
    res.send(users);
});

// POST - Add new user
router.post('/add', (req, res) => {
    console.log('POST ROUTE REACHED');
    const newUser = req.body;
    users.push({ ...newUser, id: uuidv4() });
    res.send(`User with the name ${newUser.firstName} added to the database`);
});

// GET user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        return res.status(404).send(`User with id ${id} not found`);
    }
    res.send(foundUser);
});

// DELETE user by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`User with the id ${id} deleted from the database`);
});

// PATCH - Update user
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
        return res.status(404).send(`User with id ${id} not found`);
    }

    if (firstName) foundUser.firstName = firstName;
    if (lastName) foundUser.lastName = lastName;
    if (age) foundUser.age = age;

    res.send(`User with the id ${id} has been updated`);
    console.log(foundUser);
});

export default router;

const x = require('../db');

const createUser = async (req, res) => {
    try {
        const db = await x();
        const values = req.body;
        await db.collection('instructor').insertOne(values);
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createUser };

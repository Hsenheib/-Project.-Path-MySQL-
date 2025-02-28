const express = require('express');
const router = express.Router();
const db = require('../dbSingleton').getConnection();

router.get('/', (req, res) => {
    const query = 'SELECT * FROM shifts';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(results);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE shifts SET name = ? WHERE id = ?';
    db.query(query, [name, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Shift updated!' });
    });
});

module.exports = router;

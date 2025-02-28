const express = require('express');
const router = express.Router();
const db = require('../dbSingleton').getConnection();

router.get('/', (req, res) => {
    const query = 'SELECT * FROM days';
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
    const query = 'UPDATE days SET name = ? WHERE id = ?';
    db.query(query, [name, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Day updated!' });
    });
});

router.post('/', (req, res) => {
    const { id, name } = req.body;
    const query = 'INSERT INTO days (id, name) VALUES(?, ?)';
    db.query(query, [id, name], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Day added!', id: results.insertId });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM days WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Day deleted!' });
    });
});

module.exports = router;

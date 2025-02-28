const express = require('express');
const router = express.Router();
const db = require('../dbSingleton').getConnection();

// GET /api/shifts - Retrieve all shifts
router.get('/', (req, res) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(results);
    });
});

// PUT /api/shifts/:id - Update shift name
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

// POST /api/shifts - Add a new shift
router.post('/', (req, res) => {
    const { id, name } = req.body;
    const query = 'INSERT INTO shifts (id, name) VALUES(?, ?)';
    db.query(query, [id, name], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Shift added!', id: results.insertId });
    });
});

// DELETE /api/shifts/:id - Delete a shift by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM shifts WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Shift deleted!' });
    });
});

module.exports = router;

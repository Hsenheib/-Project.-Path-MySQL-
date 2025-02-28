const express = require('express');
const router = express.Router();
const db = require('../dbSingleton').getConnection();  

// GET /api/admin - Retrieve all employees
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

// PUT /api/admin/:id - Update employee name
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body; 
    const query = 'UPDATE employees SET name = ? WHERE id = ?';  
    db.query(query, [name, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Employee updated!' });
    });
});

// POST /api/admin - Add a new employee
router.post('/', (req, res) => {
    const { id, name } = req.body;
    const query = 'INSERT INTO employees (id, name) VALUES(?, ?)';
    db.query(query, [id, name], (err, results) => {
        if (err) {
            res.status(500).send(err);  
            return;
        }
        res.json({ message: 'Employee added!', id: results.insertId });
    });
});

// DELETE /api/admin/:id - Delete an employee by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Employee deleted!' });
    });
});

module.exports = router;

//app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/users')
const dayRoutes = require('./routes/days');
const shiftRoutes = require('./routes/shifts');
const port = 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/days', dayRoutes);
app.use('/api/shifts', shiftRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


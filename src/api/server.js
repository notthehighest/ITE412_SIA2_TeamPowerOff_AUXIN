const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routers
const borrowersRouter = require('./borrowers');
const loansRouter = require('./loans');

app.use('/borrowers', borrowersRouter);
app.use('/loans', loansRouter);

app.get('/', (req, res) => res.send('API is running'));

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

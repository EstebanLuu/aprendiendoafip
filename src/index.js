const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes'); 
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

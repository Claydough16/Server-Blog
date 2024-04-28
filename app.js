const express = require('express');
const app = express()
const PORT = 4000;
const routesController = require('./controllers/routes')

app.use(express.json());
app.use('/comments', routesController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
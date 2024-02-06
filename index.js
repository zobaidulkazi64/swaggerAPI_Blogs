const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./blog.yaml');



const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



app.get('/health', (req, res) => {
    res.status(200).send('OK');
})





app.listen(8000, () => {
    console.log('Server is running on port 3000');

})
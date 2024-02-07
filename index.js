require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./blog.yaml');
const connection =require('./db')


const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



app.get('/health', (req, res) => {
    res.status(200).send('OK');
})


app.get('/api/v1/articles', async (req, res) => {
    console.log(req.query);

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const sortType = req.query.sort_type || 'asc';
    const sortBy = req.query.sort_by || 'id';
    const searchTerm = req.query.search || '';

    const db = await connection.getDB();
    let articles = db.articles;

// filter articles
    if( searchTerm) {
        articles = articles.filter(article => {
            return article.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }


// Sort articles
    articles = articles.sort((a, b) => {
        if(sortType === 'asc') {
            return a[sortBy].toString().localeCompare(b[sortBy].toString());
        } else {
            return b[sortBy].toString().localeCompare(a[sortBy].toString());
        }
    })







    const transformedArticles = articles.map(article => {
        const transformed = {...article};

        transformed.author = {
            id: article.author_id,
            name: article.author_name
        }
        transformed.link = `/articles/${transformed.id}`
        delete transformed.body;
        delete transformed.author_id;


        return transformed;
    })



    const response = {
        data: transformedArticles,
        pagination: {
            page,
            limit,
            next: page + 1,
            prev: page - 1,
            totalPage: Math.ceil(articles.length / limit),
            totalItems: articles.length
        },
        links: {
            self: req.url,
            next: `/articles?page=${page + 1}&limit=${limit}`,
            prev: `/articles?page=${page - 1}&limit=${limit}`
        }
    }
    res.status(200).send(response);
})




app.listen(8000, () => {
    console.log('Server is running on port 8000');

})
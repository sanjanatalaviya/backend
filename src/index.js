require('dotenv').config();
const express = require('express');
const connectDB = require('../src/db/mongodb');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const route = require("./routes/api/v1/index");
const passport = require('passport');
const { FacebookLoginProvider, GoogleLoginProvider } = require('./utils/Provider');
// const connetSocket = require('./utils/socketIO');   //not supported
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
// const swaggerDocument = YAML.load('./src/api.yaml');

const app = express();

GoogleLoginProvider();
FacebookLoginProvider();

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));

app.use(
    '/api/docs',
    express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            url: '/public/api.yaml' // Path to your YAML file
        }
    })
);

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();
// connetSocket(); //not supported
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api/v1", route);

app.listen(8000, () => {
    console.log("server is started at port 8000.");
})
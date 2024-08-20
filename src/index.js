require('dotenv').config();
const express = require('express');
const connectDB = require('../src/db/mongodb');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const route = require("./routes/api/v1/index");
const passport = require('passport');
const { FacebookLoginProvider, GoogleLoginProvider } = require('./utils/Provider');
const connetSocket = require('./utils/socketIO');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/api.yaml');

const app = express();

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
GoogleLoginProvider();
FacebookLoginProvider();
connetSocket();
app.use("/api/v1", route);

app.listen(8000, () => {
    console.log("server is started at port 8000.");
})
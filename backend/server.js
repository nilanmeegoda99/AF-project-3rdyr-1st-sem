const express = require('express');
const bodyParser = require ('body-parser')
const dotenv = require('dotenv');
const cors = require('cors');
const db_connect = require('./src/utils/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;


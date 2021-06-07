const express = require('express');
const dotenv = require('dotenv');
const db_connect = require('./src/utils/db');

dotenv.config();

const app = express()

db_connect();
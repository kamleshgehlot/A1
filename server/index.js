/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(helmet());

app.use(cors());

// Point static path to dist
app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
// Franchise
const franchiseUserRouter = require('./routes/franchise/user');

const routes = require('./routes');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.use('/api/franchise/user', franchiseUserRouter);

app.use('/', routes);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));

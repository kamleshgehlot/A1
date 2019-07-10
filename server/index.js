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
const staffMaster = require('./routes/staffMaster');
const categoryRouter = require('./routes/category');
const staffPosition = require('./routes/staffPosition');
const brandRouter = require('./routes/product/brand');
const colorRouter = require('./routes/product/color');
const statusRouter = require('./routes/product/status');
const locationRouter = require('./routes/location');
const taskRouter = require('./routes/task');

// Franchise
const franchiseUserRouter = require('./routes/franchise/user');
const franchiseStaff = require('./routes/franchise/staff');

const routes = require('./routes');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use('/api/status', statusRouter);

app.use('/api/location', locationRouter);
app.use('/api/task', taskRouter);
app.use('/api/user/staff',staffMaster);
app.use('/api/user/position',staffPosition);


app.use('/api/franchise/user', franchiseUserRouter);
app.use('/api/franchise/staff', franchiseStaff);

app.use('/', routes);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));

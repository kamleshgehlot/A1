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

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Point static path to dist
// app.use('/', express.static(path.join(__dirname, '..', 'dist')));
// app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/', express.static(path.join(__dirname, '..', 'src')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));

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
const leadRouter = require('./routes/lead/lead');
const profileRouter = require('./routes/setting/profile');
const passwordRouter = require('./routes/setting/password');

// Franchise
const franchiseUserRouter = require('./routes/franchise/user');
const franchiseStaff = require('./routes/franchise/staff');
const roleRouter = require('./routes/franchise/role');
const enquiryRouter = require('./routes/franchise/enquiry');


//Staff
const franchiseUser= require('./routes/franchiseUser');
const customerRouter = require('./routes/franchise/customer');

const routes = require('./routes');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use('/api/status', statusRouter);

app.use('/api/location', locationRouter);
app.use('/api/task', taskRouter);
app.use('/api/lead', leadRouter);
app.use('/api/user/staff',staffMaster);
app.use('/api/user/position',staffPosition);

app.use('/api/franchiseuser', franchiseUser);

app.use('/api/profile', profileRouter);
app.use('/api/changepassword', passwordRouter);

app.use('/api/franchise/user', franchiseUserRouter);
app.use('/api/franchise/staff', franchiseStaff);
app.use('/api/franchise/customer', customerRouter);
app.use('/api/franchise/role', roleRouter);
app.use('/api/franchise/enquiry',enquiryRouter);

app.use('/', routes);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3006'; // DEV
// const port = process.env.PORT || '3005'; // UAT
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));

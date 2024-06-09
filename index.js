import express from 'express' 
import cors from "cors"
import bodyParser from "body-parser";

import connectDB from './database.js'
import LinkRouter from './controllers/LinkRouter.js'
import UserRouter from './controllers/UserRouter.js';
import { Link } from './models/LinkModel.js';
connectDB()
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(`Your IP address is ${ipAddress} 👏`);
  });

app.use('/links', LinkRouter)
app.use('/users', UserRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on http://localhost:${port}`)
})


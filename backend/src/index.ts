import express from 'express';
import cors from 'cors';

import router from './routes/prompt';


const app = express();

app.use(cors({
    origin: 'https://vibewrite-h088pvlao-pavans-projects-99b76134.vercel.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use('/generate', router);
app.listen(5000);

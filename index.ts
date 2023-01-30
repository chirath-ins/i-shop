import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import router from './routes/routes'

dotenv.config();

const app: Express = express();
app.use(express.json())
app.use('/api', router)

const port = process.env.PORT;
const mongoString: any = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log("⚠️ Database connection error ", error)
})

database.once('connected', () => {
    console.log('✅ Database Connected');
})

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
import express, { Express } from 'express';
import cors from 'cors'
import router from './router'

const app: Express = express();
const PORT: number = 8000;

app.use(router)
app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
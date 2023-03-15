import express, { Express } from 'express';
import cors from 'cors'
import router from './router'

const app: Express = express();
const PORT: number = 8000;

app.use(express.json())
app.use(cors())
app.use(router)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
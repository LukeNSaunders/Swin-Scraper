import express, { Express } from 'express';
import cors from 'cors'
import router from './router'

const app: Express = express();
const PORT: number = Number(process.env.PORT);

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
import express, { Express } from 'express';
import cors from 'cors'
import router from './router'
import { sequelize } from './models/index';

const app: Express = express();
const PORT: number = Number(process.env.PORT);

app.use(cors())
app.use(express.json({limit:"100mb"}))
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.authenticate()
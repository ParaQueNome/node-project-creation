import express from 'express';
import { Request, Response } from 'express';
import router from './routes/routes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', router);

app.get('/' ,(req : Request, res : Response) => {
   res.send("Live"); 
})
app.get('/health', (req : Request, res : Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),

    });
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
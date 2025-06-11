import express from 'express';
import { Request, Response } from 'express';
const app = express();
const PORT = 3000;


app.get('/' ,(req : Request, res : Response) => {
   res.send("Live"); 
})
app.get('/health', (req : Request, res : Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

export default app;
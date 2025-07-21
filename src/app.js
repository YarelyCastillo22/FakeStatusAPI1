import express from 'express';
import productsRouter from './routes/products.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.use('/parallel-requests', productsRouter);

app.use((req, res) => res.status(404).json({ error: 'Endpoint no encontrado' }));

app.use(errorHandler);

export default app;

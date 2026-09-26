import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDatabase } from './config/database.js';
import empleadoRoutes from './routes/empleados.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
const port = 3000;

connectDatabase();

// 1. Configurar CORS antes de express.json() y de registrar las rutas /api/v1
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

// 2. Registrar las rutas de empleados bajo /api/v1
app.use('/api/v1', empleadoRoutes);

// 3. Middleware global de manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
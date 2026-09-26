import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  // Toma la URL de Atlas si existe en el .env, sino usa la local por defecto
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/usuarios_db';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔄 [Database]: Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('❌ Error crítico al conectar a la base de datos:', error);
    process.exit(1);
  }
};
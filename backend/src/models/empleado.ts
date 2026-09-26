import mongoose, { Schema, Document } from 'mongoose';

export interface IEmpleado extends Document {
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const empleadoSchema = new Schema<IEmpleado>(
  {
    nombre: { type: String, required: true },
    cargo: { type: String, required: true },
    departamento: { type: String, required: true },
    sueldo: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const EmpleadoModel = mongoose.model<IEmpleado>('Empleado', empleadoSchema);
export default EmpleadoModel;

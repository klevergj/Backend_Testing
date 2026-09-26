import { z } from 'zod';

export const createEmployeeSchema = z.object({
  nombre: z
    .string({ message: 'El nombre debe ser una cadena de texto' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),

  cargo: z
    .string({ message: 'El cargo es requerido' })
    .min(1, { message: 'El cargo es requerido' }),

  departamento: z
    .string({ message: 'El departamento es requerido' })
    .min(1, { message: 'El departamento es requerido' }),

  // z.coerce.number() convierte automáticamente cadenas numéricas (ej: "4500") a número
  sueldo: z.coerce
    .number({ message: 'El sueldo debe ser un número válido' })
    .positive({ message: 'El sueldo debe ser un número positivo' }),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const employeeIdParamSchema = z.object({
  id: z
    .string({ message: 'El ID es requerido' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'ID de empleado inválido (formato MongoDB ObjectId)' }),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
export type EmployeeIdParamDto = z.infer<typeof employeeIdParamSchema>;

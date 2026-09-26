import { Router } from 'express';
import { MongoEmployeeRepository } from '../Repositorios/mongo-employee.repository.js';
import { EmpleadoController } from '../controllers/empleados.controllers.js';
import { validateBody, validateParams } from '../middlewares/validateDto.js';
import { createEmployeeSchema, updateEmployeeSchema, employeeIdParamSchema } from '../dtos/employee.dto.js';

const router = Router();
const employeeRepository = new MongoEmployeeRepository();
const empleadoController = new EmpleadoController(employeeRepository);

// Soporte unificado para alias en español (/empleados) e inglés (/employees)
router.get(['/employees', '/empleados'], empleadoController.getEmpleado);
router.get(['/employees/:id', '/empleados/:id'], validateParams(employeeIdParamSchema), empleadoController.getEmpleadoById);
router.post(['/employees', '/empleados'], validateBody(createEmployeeSchema), empleadoController.addEmpleado);
router.put(['/employees/:id', '/empleados/:id'], validateParams(employeeIdParamSchema), validateBody(updateEmployeeSchema), empleadoController.updateEmployee);
router.delete(['/employees/:id', '/empleados/:id'], validateParams(employeeIdParamSchema), empleadoController.deleteEmployee);

export default router;
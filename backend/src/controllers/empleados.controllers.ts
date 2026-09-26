import type { Request, Response, NextFunction } from 'express';
import type { EmployeeRepositoryInterface } from '../Repositorios/employee.repository.interface.js';
import { ApiResponse } from '../utils/api-response.js';

export class EmpleadoController {
  constructor(private empleadoRepository: EmployeeRepositoryInterface) {}

  getEmpleado = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employees = await this.empleadoRepository.getAllEmployees();
      ApiResponse.success(res, employees);
    } catch (error) {
      next(error);
    }
  };

  getEmpleadoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const employee = await this.empleadoRepository.getEmployeeById(id);
      if (!employee) {
        ApiResponse.error(res, 'Empleado no encontrado', 404);
        return;
      }
      ApiResponse.success(res, employee);
    } catch (error) {
      next(error);
    }
  };

  addEmpleado = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newEmployee = await this.empleadoRepository.createEmployee(req.body);
      ApiResponse.success(res, newEmployee, 'Empleado creado exitosamente', 201);
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const updatedEmployee = await this.empleadoRepository.updateEmployee(id, req.body);
      if (!updatedEmployee) {
        ApiResponse.error(res, 'Empleado no encontrado', 404);
        return;
      }
      ApiResponse.success(res, updatedEmployee, 'Empleado actualizado exitosamente');
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const deleted = await this.empleadoRepository.deleteEmployee(id);
      if (!deleted) {
        ApiResponse.error(res, 'Empleado no encontrado', 404);
        return;
      }
      ApiResponse.success(res, null, 'Empleado eliminado correctamente');
    } catch (error) {
      next(error);
    }
  };
}
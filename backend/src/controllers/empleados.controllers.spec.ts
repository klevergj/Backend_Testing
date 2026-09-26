import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import type { Request, Response } from 'express';
import { EmpleadoController } from './empleados.controllers.js';
import type { EmployeeRepositoryInterface, Employee } from '../Repositorios/employee.repository.interface.js';

describe('Unit Test: EmployeeController (Mantenibilidad & Testabilidad)', () => {
  let controller: EmpleadoController;
  let mockRepository: jest.Mocked<EmployeeRepositoryInterface>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: any;
  let jsonMock: any;
  let nextMock: any;

  const mockEmployee: Employee = {
    _id: '64f8a1234567890abcdef123',
    nombre: 'Carlos Ruiz',
    cargo: 'Desarrollador Senior',
    departamento: 'Ingeniería',
    sueldo: 3500,
  };

  beforeEach(() => {
    mockRepository = {
      getAllEmployees: jest.fn(),
      getEmployeeById: jest.fn(),
      createEmployee: jest.fn(),
      updateEmployee: jest.fn(),
      deleteEmployee: jest.fn(),
    } as unknown as jest.Mocked<EmployeeRepositoryInterface>;

    controller = new EmpleadoController(mockRepository);

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockResponse = { status: statusMock };
    nextMock = jest.fn();
  });

  it('Debería inicializar el controlador correctamente con el repositorio inyectado', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmpleado', () => {
    it('Debería retornar la lista de empleados con respuesta de éxito', async () => {
      const employees = [mockEmployee];
      (mockRepository.getAllEmployees as any).mockResolvedValue(employees);
      mockRequest = {};

      await controller.getEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

      expect(mockRepository.getAllEmployees).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: employees,
      });
    });

    it('Debería propagar el error al middleware mediante next() en caso de falla', async () => {
      const error = new Error('Database error');
      (mockRepository.getAllEmployees as any).mockRejectedValue(error);
      mockRequest = {};

      await controller.getEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('getEmpleadoById', () => {
    it('Debería retornar un empleado si existe', async () => {
      (mockRepository.getEmployeeById as any).mockResolvedValue(mockEmployee);
      mockRequest = { params: { id: mockEmployee._id } };

      await controller.getEmpleadoById(mockRequest as Request, mockResponse as Response, nextMock);

      expect(mockRepository.getEmployeeById).toHaveBeenCalledWith(mockEmployee._id);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockEmployee,
      });
    });

    it('Debería retornar 404 si el empleado no se encuentra', async () => {
      (mockRepository.getEmployeeById as any).mockResolvedValue(null);
      mockRequest = { params: { id: 'non-existent-id' } };

      await controller.getEmpleadoById(mockRequest as Request, mockResponse as Response, nextMock);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: { message: 'Empleado no encontrado' },
      });
    });
  });

  describe('addEmpleado', () => {
    it('Debería crear un nuevo empleado y responder con status 201', async () => {
      const newEmployeeData = {
        nombre: 'Carlos Ruiz',
        cargo: 'Desarrollador Senior',
        departamento: 'Ingeniería',
        sueldo: 3500,
      };
      (mockRepository.createEmployee as any).mockResolvedValue(mockEmployee);
      mockRequest = { body: newEmployeeData };

      await controller.addEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

      expect(mockRepository.createEmployee).toHaveBeenCalledWith(newEmployeeData);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Empleado creado exitosamente',
        data: mockEmployee,
      });
    });
  });

  describe('updateEmployee', () => {
    it('Debería actualizar y retornar el empleado actualizado', async () => {
      const updateData = { sueldo: 4000 };
      const updatedEmployee = { ...mockEmployee, sueldo: 4000 };
      (mockRepository.updateEmployee as any).mockResolvedValue(updatedEmployee);
      mockRequest = { params: { id: mockEmployee._id }, body: updateData };

      await controller.updateEmployee(mockRequest as Request, mockResponse as Response, nextMock);

      expect(mockRepository.updateEmployee).toHaveBeenCalledWith(mockEmployee._id, updateData);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Empleado actualizado exitosamente',
        data: updatedEmployee,
      });
    });

    it('Debería retornar 404 si el empleado a actualizar no existe', async () => {
      (mockRepository.updateEmployee as any).mockResolvedValue(null);
      mockRequest = { params: { id: 'non-existent-id' }, body: { sueldo: 4000 } };

      await controller.updateEmployee(mockRequest as Request, mockResponse as Response, nextMock);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: { message: 'Empleado no encontrado' },
      });
    });
  });

  describe('deleteEmployee', () => {
    it('Debería eliminar un empleado correctamente', async () => {
      (mockRepository.deleteEmployee as any).mockResolvedValue(true);
      mockRequest = { params: { id: mockEmployee._id } };

      await controller.deleteEmployee(mockRequest as Request, mockResponse as Response, nextMock);

      expect(mockRepository.deleteEmployee).toHaveBeenCalledWith(mockEmployee._id);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Empleado eliminado correctamente',
        data: null,
      });
    });

    it('Debería retornar 404 si el empleado a eliminar no existe', async () => {
      (mockRepository.deleteEmployee as any).mockResolvedValue(false);
      mockRequest = { params: { id: 'non-existent-id' } };

      await controller.deleteEmployee(mockRequest as Request, mockResponse as Response, nextMock);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: { message: 'Empleado no encontrado' },
      });
    });
  });
});
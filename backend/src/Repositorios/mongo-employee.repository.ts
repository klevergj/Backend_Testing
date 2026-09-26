import type { EmployeeRepositoryInterface, EmployeeData, Employee } from './employee.repository.interface.js';
import EmpleadoModel from '../models/empleado.js';

export class MongoEmployeeRepository implements EmployeeRepositoryInterface {
  async createEmployee(employeeData: EmployeeData): Promise<Employee> {
    const newEmployee = new EmpleadoModel(employeeData);
    const saved = await newEmployee.save();
    return saved.toObject() as unknown as Employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employees = await EmpleadoModel.find().lean().exec();
    return employees as unknown as Employee[];
  }

  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    const employee = await EmpleadoModel.findById(employeeId).lean().exec();
    return (employee as unknown as Employee) || null;
  }

  async updateEmployee(employeeId: string, employeeData: Partial<EmployeeData>): Promise<Employee | null> {
    const updated = await EmpleadoModel.findByIdAndUpdate(employeeId, employeeData, { new: true }).lean().exec();
    return (updated as unknown as Employee) || null;
  }

  async deleteEmployee(employeeId: string): Promise<boolean> {
    const result = await EmpleadoModel.findByIdAndDelete(employeeId).exec();
    return result !== null;
  }
}
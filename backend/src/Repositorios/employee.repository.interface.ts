export interface EmployeeData {
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
}

export interface Employee extends EmployeeData {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeRepositoryInterface {
  createEmployee(employeeData: EmployeeData): Promise<Employee>;
  getEmployeeById(employeeId: string): Promise<Employee | null>;
  updateEmployee(employeeId: string, employeeData: Partial<EmployeeData>): Promise<Employee | null>;
  deleteEmployee(employeeId: string): Promise<boolean>;
  getAllEmployees(): Promise<Employee[]>;
}

export type IEmployeeRepository = EmployeeRepositoryInterface;
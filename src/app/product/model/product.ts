export interface Product {
  _id?: string;
  nombre: string;
  caracteristica: string;
  fechaLanzamiento: string;
  email: string;
  paisFabricacion: string;
  precio: number;
  unidadesVendidas: number;
  unidadesDisponibles: number;
  imagenURL?: string;
}

import { Signos } from "./signos";

export class Paciente {
    idPaciente: number;
    nombres: string;
    apellidos: string;
    dni: string;
    direccion: string;
    telefono: string;
    email: string;
    totalSignos: number;
    signos: Signos[];


    constructor(idP: number, nombres: string, apellidos: string, dni: string, direccion: string, telefono: string, email: string, totalSignos: number, signos: Signos[]) {
      this.idPaciente = idP;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.dni = dni;
      this.direccion = direccion;
      this.telefono = telefono;
      this.email = email;
      this.totalSignos = totalSignos;
      this.signos = signos;
    }
}

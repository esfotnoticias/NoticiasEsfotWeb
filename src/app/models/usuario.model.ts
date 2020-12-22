export class Usuario {
    uid:string;
    email: string;
    nombre: string;
    rol:string;
    estado?:string;
    usuarioVerificado:boolean;
    creado?:string;
    apellido?:string;
    genero?:  string;
    password?: string;
    password1?: string;
    carrera?: string;
    fechanacimiento?:Date;
    photoURL?:any[];
    credencial?:any[];
    emailVerified: boolean;
    grupos?:string[];
    token?:string;
}

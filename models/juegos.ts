export interface Juego{
    
    nombre: string;
    precio: number;
    image: string;
    link: string;
    page: string;
}


export interface Usuario{
    id: string;
    nombre: string;
    email: string;
    fechaNacimiento: Date;
}
export interface Favorito{
    idUsuario: string;
    idJuego: string;
}
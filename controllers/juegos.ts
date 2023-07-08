import { auth } from "../firebase"
import { getIdToken } from 'firebase/auth';
import { Juego } from "../models/juegos";

export async function getjuego() {
        const response = await fetch('http://localhost:9000/api/juegos');
        const data = await response.json();
        console.log("", data.Juegos);
        return data.Juegos;
}


export async function getjuegoNombre(Nombre: string) {
    if (Nombre != undefined) {
            const response = await fetch(`http://localhost:9000/api/juegos/${Nombre}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}

export async function postjuego(nombre: string, precio: number, Image: string, link: string, page: string) {

    if (auth.currentUser) {
        const juego: Juego = {
            nombre : nombre,
            precio: precio,
            image: Image,
            link: link,
            page: page
        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch('http://localhost:9000/api/juegos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(juego)

        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }

}

export async function putjuego(id:number, nombre: string, precio: number, Image: string, link: string, page: string) {

    if (auth.currentUser) {
        const instituion: Juego = {
            nombre : nombre,
            precio: precio,
            image: Image,
            link: link,
            page: page
        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`http://localhost:9000/api/juegos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instituion)
        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }
}

export async function deletejuego(id: number) {
    if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`http://localhost:9000/api/juegos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };;

    }
}


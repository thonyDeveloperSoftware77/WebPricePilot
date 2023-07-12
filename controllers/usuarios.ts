import { auth } from "../firebase"
import { getIdToken } from 'firebase/auth';
import { Usuario } from "../models/juegos";

export async function getusuario() {
    if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        const response = await fetch('https://apiscrapperpricepilot.hop.sh/api/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("", data.usuarios);
        return data.usuarios;
    } else {
        // Handle the case where there is no current user
        console.log("No hay usuario logueado");
        return null;
    }
}

export async function postusuario(id: string, nombre: string, email: string, fechaNacimiento: Date) {

    if (auth.currentUser) {
        const usuario: Usuario = {
            id: id,
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento
        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch('https://apiscrapperpricepilot.hop.sh/api/usuarios', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)

        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }

}

export async function putusuario(id: string, nombre: string, email: string, fechaNacimiento: Date) {

    if (auth.currentUser) {
        const instituion: Usuario = {
            id: id,
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento
        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/usuarios/${id}`, {
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

export async function deleteusuario(id: number) {
    if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/usuarios/${id}`, {
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


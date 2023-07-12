import { auth } from "../firebase"
import { getIdToken } from 'firebase/auth';
import { Favorito} from "../models/juegos";


export async function getfavoritoUsuario(idUsuario: string) {
    if (idUsuario != undefined) {
            const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${idUsuario}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}

export async function getfavoritoJuego(idJuego: string) {
    if (idJuego != undefined) {
            const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/juego/${idJuego}`);
            const data = await response.json();
            return data;
      
    }else
    {
        console.log("Id Invalido");
        return null;
    }
}

export async function postfavorito(idUsuario: string, idJuego: string) {

    if (auth.currentUser) {
        const favorito: Favorito = {
            idUsuario : idUsuario,
            idJuego: idJuego,
        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch('https://apiscrapperpricepilot.hop.sh/api/favoritos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favorito)

        })
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        };
    }

}

export async function putfavorito(idUsuario: string, idJuego: string, id: number) {

    if (auth.currentUser) {
        const instituion: Favorito = {
            idUsuario : idUsuario,
            idJuego: idJuego,

        }
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${id}`, {
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

export async function deletefavorito(id: number) {
    if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        const response = await fetch(`https://apiscrapperpricepilot.hop.sh/api/favoritos/${id}`, {
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


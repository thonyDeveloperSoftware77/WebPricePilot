import { useRouter } from 'next/router';
import { auth } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../../controllers/userProvider';
import { getIdToken } from 'firebase/auth';
import Image from 'next/image';
import logo from "../../public/LogoPricePortal.png"
//importacion de componentes
import Loader from '../../views/others/Loader';
import { postusuario } from '../../controllers/usuarios';
//Importar componentes
import Juegos from "../../views/Juegos"
import GestionJuegos from "../../views/GestionJuegos"
import Favoritos from "../../views/Favoritos"

//Importar iconos
import { HiOutlineLogin, HiOutlineOfficeBuilding, HiTemplate } from 'react-icons/hi'
import { AiOutlineHome, AiOutlineUserSwitch, AiOutlineCheckSquare } from 'react-icons/ai'
import { MdOutlineSettingsSuggest, MdOutlineDangerous } from 'react-icons/md'
import { BsClipboardData, BsClipboardPulse, BsInfoSquare, BsFillClipboard2PulseFill, BsQuestionDiamond } from 'react-icons/bs'
import { RxComponent2, RxComponent1 } from 'react-icons/rx'
import { IoFootstepsOutline, IoAnalyticsOutline } from 'react-icons/io5'
import { GoGraph } from 'react-icons/go'
import { ImListNumbered } from 'react-icons/im'
import { BiCategory } from 'react-icons/bi'


export default function DashboardClient() {


    //State para loading
    const [isLoading, setIsLoading] = useState(true);

    //State para mostrar el formulario del login
    const [showForm, setShowForm] = useState(false);
    //Datos de input para el nuevo usuario
    const Nombre = useRef(null);

    const router = useRouter();
    const { user, setUser } = useUser();
    const [dataUser, setDataUser] = useState();

    const [field, setField] = useState({
        fechaNacimiento: "",
    });

    //OpcionesDelMenu
    const [opcionesMenu, setOpcionesMenu] = useState([{
        0: false,
        component: Juegos
    }, {
        1: false,
        component: Favoritos
    }]);

    //estado para el menu
    const [gestiones, setGestiones] = useState(null)
    const [mMadurez, setMMadurez] = useState(true)
    const [mControlInterno, setMControlInterno] = useState(true)
    const [gestionRiesgo, setGestionRiesgo] = useState(true)

    //funciones para los cambios de estados

    const handleChangeOption = (numero) => {
        const nuevasOpcionesMenu = opcionesMenu.map((opcion, index) => {
            return {
                ...opcion,
                [index]: index === numero
            }
        })

        setOpcionesMenu(nuevasOpcionesMenu)
    }

    const handleChangeGestiones = (idOpcion) => {

        if (idOpcion === 0) {
            setGestiones(!gestiones)
            setMMadurez(true)
            setMControlInterno(true)
            setGestionRiesgo(true)
        } else if (idOpcion === 1) {
            setMMadurez(!mMadurez)
            setGestiones(true)
            setMControlInterno(true)
            setGestionRiesgo(true)
        } else if (idOpcion === 2) {
            setMControlInterno(!mControlInterno)
            setGestiones(true)
            setMMadurez(true)
            setGestionRiesgo(true)
        } else if (idOpcion === 3) {
            setGestionRiesgo(!gestionRiesgo)
            setGestiones(true)
            setMMadurez(true)
            setMControlInterno(true)

        }
    }

    //Función para ingresar un usuario
    const ingresarUsuario = async (event) => {
        event.preventDefault(); //Evita que se recargue la página

        try {
            const nombre = Nombre.current.value
            const id = auth.currentUser.uid
            const email = auth.currentUser.email
            const fechaNacimiento = field.fechaNacimiento

            await postusuario(id, nombre, email, fechaNacimiento).then((res) => {
                if (res.msg !== undefined) {
                    notifyErrorCorreo(res.msg)
                } else {
                    notifyCreateUser();

                }

            })
                .catch((error) => {
                    alert(error.message);
                });




        } catch (error) {
            alert("error")
            console.log(error)
        }
    }



    useEffect(() => {

        let unsubscribe;
        try {


            async function verificarUsuario(uid) {
                if (auth.currentUser) {
                    const token = await getIdToken(auth.currentUser);
                    try {
                        const response = await fetch(`http://localhost:9000/api/usuarios/${uid}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        setDataUser(data);
                        console.log(data)
                        if (data.nombre) {
                            setShowForm(false);

                            return data;
                        } else {
                            setShowForm(true);
                            // Usuario no encontrado, mostrar formulario
                            // ...
                        }
                    } catch (error) {
                        console.log(error);
                    }


                } else {
                    // Handle the case where there is no current user
                    console.log("No hay usuario logueado");
                    return null;
                }
            }

            unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user && user.uid) {
                    setUser(user);
                    verificarUsuario(user.uid);
                    setIsLoading(false);
                } else {
                    // El usuario ha cerrado sesión o su sesión ya no es válida
                    setUser(null);
                    router.push('/');
                }
            });

        } catch (error) {
            alert("No se pudo cargar la información. Por favor, recargue la página.");
            console.log(error);
        }

        return () => unsubscribe(); // Retornar la función de cancelación del efecto

    }, []);

    if (isLoading) {
        return <div>
            <Loader />
        </div>;
    }
    if (!user) {
        router.push("/");
    }
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <div className={showForm ? 'registerContainer' : 'ocultarForm'}>
                <video autoPlay loop muted layout="responsive" src="./login.m4v"></video>
                <div className='cardLogin'>
                    <h2>
                        Registrate!
                    </h2>
                    <p>
                        En PricePilot, entendemos que la búsqueda de juegos puede llevar tiempo y que es posible que desees seguir de cerca ciertos títulos. Por eso hemos creado la función de Favoritos para ti. Cuando te registres en PricePilot, podrás guardar tus juegos favoritos en tu lista personalizada.
                    </p>
                    <form onSubmit={ingresarUsuario}>
                        <div >
                            <div>
                                <h2>Ingrese su nombre</h2>
                                <input style={{ width: "100%" }} type="text" ref={Nombre} />

                            </div>

                            <div>
                                <h2>Fecha de Nacimiento</h2>
                                <input style={{ width: "100%" }} type="date" onChange={(e) => setField({ ...field, fechaNacimiento: e.target.value })} />

                            </div>
                            <br />
                            <br />
                            <center>
                                <button type='submit' class="button-64" role="button" >
                                    <span class="text">
                                          Registrarme
                                    </span>
                                </button>
                            </center>
                        </div>
                    </form>

                </div>

            </div>



            <div className='NoDisponibleMovil'>
                <div>
                    <Image src={logo} alt='logo' layout='responsive' />

                </div>
                <div>

                    <h1>Esta página no está disponible en dispositivos móviles, por favor instale la App</h1>
                </div>
            </div>

            <div className='SideBar'>
                <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                    <Image src={logo} alt='logo AuditSafe Consulting' layout='responsive' />
                </div>
                <br />
                <br />
                <br />
                <div className="dropdown" >

                </div>
                <div className="dropdown">
                    <a href="#" onClick={() => handleChangeGestiones(0)} ><MdOutlineSettingsSuggest size={22} />Gestiones</a>

                    <div className={gestiones ? 'dropdown-content' : 'dropdown-contentClick'}>
                        <a className={opcionesMenu[0][0] ? 'color' : ''} onClick={() => handleChangeOption(0)}><AiOutlineUserSwitch size={20} />-Juegos</a>
                        <a className={opcionesMenu[1][1] ? 'color' : ''} onClick={() => handleChangeOption(1)}><AiOutlineUserSwitch size={20} />-Favoritos</a>
                    </div>
                </div>
                <br />
                <br />

            </div>

            <div className='ContentContainer'>
                <div className='ProfileBarContainer'>
                    <div>
                        <img className='ImageProfile' style={{ width: "60px" }} src={user?.photoURL} alt="Picture of the author" />
                    </div>
                    <div >
                        <h5>Bienvenido!</h5>
                        <h5>{dataUser?.nombre}</h5>
                        <a style={{ display: 'flex', alignItems: 'center', padding: "5px", cursor: "pointer", fontSize: "18px", fontWeight: "bold" }} onClick={() => auth.signOut()}><HiOutlineLogin />Cerrar sesión</a>
                    </div>
                </div>
                <div>

                </div>
                <div style={{ width: "100%" }}>
                    {opcionesMenu.map((opcion, index) => {
                        if (opcion[index]) {
                            const Component = opcion.component;
                            return <div key={index}  ><Component favorites={1} id="admin" handleChangeOption={handleChangeOption} /></div>
                        }
                    })}
                </div>
            </div>
        </div >
    );
}

import { useRouter } from 'next/router';
import { auth } from '../../firebase'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../../controllers/userProvider';
import { getIdToken } from 'firebase/auth';
import Image from 'next/image';
import logo from "../../public/LogoPricePortal.png"
//importacion de componentes
import Loader from '../../views/others/Loader';

//Importar componentes
import Juegos from "../../views/Juegos"
import GestionJuegos from "../../views/GestionJuegos"
import GestionUsuarios from '../../views/GestionUsuarios';

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


export default function Dashboard() {


    //State para loading
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { user, setUser } = useUser();
    const [dataUser, setDataUser] = useState();


    //OpcionesDelMenu
    const [opcionesMenu, setOpcionesMenu] = useState([{
        0: false,
        component: GestionUsuarios
    }, {
        1: false,
        component: GestionJuegos
    },
    {
        2: false,
        component: Juegos
    },]);

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




    useEffect(() => {

        let unsubscribe;
        try {
            async function fetchData() {
                const token = await getIdToken(auth.currentUser);

                const response = await fetch('http://localhost:9000/api/usuarios', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setDataUser(data);
            }


            unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user && user.uid === process.env.USER_IDKEY) {
                    // El usuario ha iniciado sesión y su UID es igual al valor de USER_IDKEY
                    setUser(user);
                    fetchData();
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
            <div className='NoDisponibleMovil'>
                <div>
                    <Image src={logo} alt='logo' layout='responsive' />

                </div>
                <div>

                    <h1>Esta página no está disponible en dispositivos móviles</h1>
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
                        <a className={opcionesMenu[0][0] ? 'color' : ''} onClick={() => handleChangeOption(0)}><AiOutlineUserSwitch size={20} />-Gestión de Usuario</a>
                        <a className={opcionesMenu[1][1] ? 'color' : ''} onClick={() => handleChangeOption(1)}><AiOutlineCheckSquare size={20} />-Gestión de Juegos</a>
                    </div>
                </div>
                <br />
                <br />
                <div className="dropdown">
                    <a href="#" onClick={() => handleChangeGestiones(0)} ><MdOutlineSettingsSuggest size={22} />Juegos</a>

                    <div className={gestiones ? 'dropdown-content' : 'dropdown-contentClick'}>
                        <a className={opcionesMenu[2][2] ? 'color' : ''} onClick={() => handleChangeOption(2)}><AiOutlineUserSwitch size={20} />-Juegos</a>
                    </div>
                </div>

            </div>

            <div className='ContentContainer'>
                <div className='ProfileBarContainer'>
                    <div>
                        <img className='ImageProfile' style={{ width: "60px" }} src={user?.photoURL} alt="Picture of the author" />
                    </div>
                    <div >
                        <h5>Bienvenido!, {dataUser?.[0]?.Nombre}</h5>
                        <p >Administrador</p>
                        <a style={{ display: 'flex', alignItems: 'center', padding: "5px", cursor: "pointer", fontSize: "18px", fontWeight: "bold" }} onClick={() => auth.signOut()}><HiOutlineLogin />Cerrar sesión</a>
                    </div>
                </div>
                <div>

                </div>
                <div style={{ width: "100%" }}>
                    {opcionesMenu.map((opcion, index) => {
                        if (opcion[index]) {
                            const Component = opcion.component;
                            return <div key={index}  ><Component id="admin" handleChangeOption={handleChangeOption} /></div>
                        }
                    })}
                </div>
            </div>
        </div >
    );
}

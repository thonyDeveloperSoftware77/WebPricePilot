import Image from 'next/image';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState, useRef } from 'react';
//Libreria para el Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Libreria para notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import { useUser } from '../../controllers/userProvider';
//Componente para loader
import Loader from '../../views/others/Loader';
//IMPORT ICONS
import { MdEmail } from 'react-icons/md';
import { ImUserTie } from 'react-icons/im';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { BsFillBuildingsFill, BsFillClipboard2PulseFill, BsFillClipboardDataFill } from 'react-icons/bs';
import { MdOutlineDangerous } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

//Importar Spline design
import Spline from '@splinetool/react-spline';

export default function Home() {

  //Notificaciones
  const notifyLogin = () => toast("Usuario logeado con éxito, por favor espere!");
  const notifyError = () => toast.error("Contraseña o correo incorrecto, por favor intente de nuevo");
  const notifyNoAutorizado = () => toast("Para continuar inicia sesión con una cuenta de administrador o usuario");

  //Use state para mostrar el modal 
  const [signupActive, setSignupActive] = useState(false);
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  //UseRef para formulario
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const googleAuth = new GoogleAuthProvider();



  //Configuracion para el Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    prevArrow: null,
    nextArrow: null
  };


  const loginAdmin = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    // Guarda los datos del usuario en el estado
    setUser(result.user);
  }

  useEffect(() => {
    if (user) {
      handleLogin();
    }
  }, [user]);

  async function handleLogin() {
    if (user?.uid === process.env.USER_IDKEY) {
      console.log('User is logged in');
      setLoading(true); // Inicia la carga
      router.push({ pathname: '/dashboard' }, '/dashboard');
    } else if (user?.uid != null) {
      router.push({ pathname: '/dashboardClient' }, '/dashboardClient');
    } else {
      notifyNoAutorizado();
      setUser(null)
      auth.signOut();
      router.push('/');
      router.push('/');
      router.push('/');
      setLoading(false); // Finaliza la carga
    }
  }



  //Función para guardar los cambios en la tabla
  const handleRowSave = () => {

    setMostrar(true);
  };
  return (
    <main>
      {loading ? ( // Verifica si está cargando y muestra el loader
        <Loader />
      ) : (
        <>
          <ToastContainer
            theme="dark"
          />
          <div className='LandingPageContainer'>



            <div className='NavSectionFill'>
              |
            </div>


            <div className='containerLanding'>



              <div className='sliderContainer' >
                {<Slider className='sliderButon' {...settings}>
                  <div>
                    <video autoPlay loop muted layout="responsive" src="./Slidervideos11.m4v"></video>
                  </div>
                  <div>
                    <video autoPlay loop muted layout="responsive" src="./Slidervideos12.m4v"></video>
                  </div>
                  <div>
                    <video autoPlay loop muted layout="responsive" src="./Slidervideos13.m4v"></video>
                  </div>
                  <div>
                    <video autoPlay loop muted layout="responsive" src="./Slidervideos14.m4v"></video>
                  </div>
                </Slider>
                }
              </div>
              <h2>
                Acerca de Price Pilot
              </h2>
              <br /><br /><br />
              <div className='galleryLanding'>
                <div>
                  <center>
                    <img style={{ position: "relative", top: "-30px" }} src="./logosGames.png" alt="" />
                  </center>
                  <center>
                    <p>
                      Bienvenido a PricePilot, la herramienta definitiva para encontrar los mejores precios en juegos. Con PricePilot, puedes buscar en múltiples plataformas como Eneba, Steam, 2game y GamersGate, y comparar los precios para encontrar las ofertas más atractivas.
                    </p>
                  </center>

                </div>

                <div style={{ position: "relative" }}>
                  <center>
                    <img style={{ position: "relative", top: "-30px", right: "0" }} src="./mando.png" alt="" />
                  </center>
                  <p>
                    Nuestra plataforma te permite ahorrar tiempo y dinero al brindarte acceso a una amplia gama de juegos y sus precios más bajos en un solo lugar. ¡Explora, compara y ahorra con PricePilot!
                  </p>

                </div>
                <div style={{ position: "relative" }}>
                  <center>
                    <img style={{ position: "absolute", top: "-70px", right: "0", width: "50%" }} src="./imageCard.png" alt="" />
                  </center>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <p>
                    Con PricePilot, nunca más tendrás que preocuparte por pagar de más por tus juegos favoritos. Nuestra potente herramienta de búsqueda rastrea múltiples plataformas en línea y te muestra los precios más bajos disponibles.
                  </p>

                </div>
              </div>
              <center>
                <button class="button-64" role="button" >
                  <span class="text">
                    Buscar Juegos
                  </span>
                </button>
              </center>



              <div style={{ display: "flex", width: "100%" }}>
                <div className='SplineContainer' >
                  <Spline scene="https://prod.spline.design/V7AnI3xkUcNPyHET/scene.splinecode" />
                </div>
                <div style={{ width: "40%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>

                  <div>
                    <h2>
                      ¡PricePilot: Tu mejor compañero de compras de juegos ahora en tu móvil!
                    </h2>
                    <p>
                      Descarga nuestra aplicación móvil gratuita y lleva PricePilot contigo donde quiera que vayas. Encuentra los mejores precios en juegos, compara ofertas y guarda tus favoritos fácilmente desde tu dispositivo móvil.
                    </p>
                  </div>

                </div>
              </div>

              <div className='loginContainer'>
                <video autoPlay loop muted layout="responsive" src="./login.m4v"></video>
                <div className='cardLogin'>
                  <h2>
                    Registrate o Inicia Sesión!
                  </h2>
                  <p>
                    En PricePilot, entendemos que la búsqueda de juegos puede llevar tiempo y que es posible que desees seguir de cerca ciertos títulos. Por eso hemos creado la función de "Favoritos". Cuando te registres en PricePilot, podrás guardar tus juegos favoritos en tu lista personalizada.
                  </p>

                  <button class="button-64" role="button" onClick={loginAdmin}>
                    <span class="text">
                      <AiOutlineGooglePlus size={35} />  Iniciar Sesión
                    </span>
                  </button>
                </div>
              </div>





            </div>




          </div>






        </>
      )}
    </main>
  )
}

import '../styles/globals.css'
import { UserProvider } from "../../controllers/userProvider"
import logo from '../../public/LogoPricePortal.png';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';



import { MdEmail } from 'react-icons/md';
import { AiOutlineLink } from 'react-icons/ai';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [show, handleShow] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        // Mostrar navbar
        handleShow(true)
      } else {
        // Ocultar navbar
        handleShow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <UserProvider>
      {router.pathname === '/dashboard' || router.pathname === '/dashboardClient' ? "" : <nav className={show ? 'navbarShow' : 'LandingPageNav'} >

        <div >
          <Image src={logo} alt="Logo" width={90} height={90} />
        </div>

        <div>
          <Link href="/">
            <span className={router.pathname === '/' ? 'active' : ''}>Inicio</span>
          </Link>
        </div>
        <div>
          <Link href="/dashboardPublic">
            <span className={router.pathname === '/dashboardPublic' ? 'active' : ''}>Juegos</span>
          </Link>
        </div>


      </nav>}

      <Component {...pageProps} />
      {router.pathname === '/dashboard' || router.pathname === '/dashboardClient' ? "" : <>
        <footer className='footer'>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <div >
              <Image src={logo} alt="Logo" width={150} height={150} />
            </div>

            <div>

              <h2>Contacto</h2>
              <p> <MdEmail /> PricePortal@gmail.com</p>
            </div>
            <div>

              <h2>Juegos</h2>
              <Link href='/dashboardPublic' >Los mejore Precios</Link>
            </div>

          </div>

        </footer>
        <center>
          <p>
            Price Portal © 2023
          </p>
        </center>
      </>}

    </UserProvider>
  );
}

export default MyApp

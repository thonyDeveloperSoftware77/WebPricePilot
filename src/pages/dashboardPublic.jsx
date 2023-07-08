import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../controllers/userProvider';
import Image from 'next/image';
import logo from "../../public/LogoPricePortal.png"
import Juegos from "../../views/Juegos"


export default function DashboardClient() {






    return (
        <>
           

            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                <div className='NoDisponibleMovil'>
                    <div>
                        <Image src={logo} alt='logo' layout='responsive' />

                    </div>
                    <div>

                        <h1>Esta página no está disponible en dispositivos móviles, por favor instale la App</h1>
                    </div>
                </div>


                <div>
                    <Juegos favorites={0} />

                </div>


            </div >
        </>
    );
}

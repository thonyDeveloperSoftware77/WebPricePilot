import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "../controllers/userProvider";

//Importar librerias de PrimeReact
import dynamic from 'next/dynamic';
//Importar libreria de Apex chart con server side rending deshabilitado
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

import { AiOutlineCloseCircle } from "react-icons/ai";
//Libreria para el Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getjuego, getjuegoNombre } from "../controllers/juegos"
import { deletefavorito, getfavoritoUsuario, postfavorito } from "../controllers/favoritos"


export default function CategoriaNorma(props) {
    const notifyCreate = () => toast("Juego añadido a favoritos con éxito!");
    const notifyUpdate = () => toast("Este juego ya se encuentra en favoritos!");
    const notifyDelete = () => toast("Juego eliminado de favoritos con éxito!");

    const [data, setData] = useState([]);

    const { user, setUser } = useUser();
    const [selectedStore, setSelectedStore] = useState(1);
    const [update, setUpdate] = useState(false);

    //Configuracion para el Slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3800,
        prevArrow: null,
        nextArrow: null
    };


    const [loading, setLoading] = useState(false);


    const [fields, setFields] = useState({
        nombre: "",
    })

    const handleDeleteFavorite = async (id) => {
        deletefavorito(id).then((res) => {
            notifyDelete();
            setUpdate(!update);
        }).catch((err) => {
            console.log(err)
        })
    }




    useEffect(() => {

        setLoading(true);
        getfavoritoUsuario(user.uid).then((res) => {
            console.log(res)
            const dataRenderTables = res.favoritos.map((item) => {
                
                return {
                    idFuera: item.id,
                    id: item.Juego.id,
                    nombre: item.Juego.nombre,
                    precio: item.Juego.precio,
                    image: item.Juego.image,
                    link: item.Juego.link,
                    page: item.Juego.page,
                };
            });
            setData(dataRenderTables);
            console.log(dataRenderTables)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        }
        )
    }, [update]);
    return (
        <>
            <ToastContainer
                theme="dark"
            />
            {loading ? (
                <div className='LoaderBox'>
                    <span class="loader"></span>
                </div>
            ) : (
                <>
                    <div className='sliderContainer' >
                        {<Slider className='sliderButon' {...settings}>
                            <div>
                                <img src="./slider11.png" alt="" />
                            </div>
                            <div>
                                <img src="./sliderr12.png" alt="" />
                            </div>
                            <div>
                                <img src="./slider13.png" alt="" />
                            </div>
                            <div>
                                <img src="./slider14.png" alt="" />
                            </div>

                        </Slider>
                        }
                    </div>


                    <div>
                        <a
                            className={`StoreSelect ${selectedStore === 1 ? 'selected' : ''}`}
                            onClick={() => setSelectedStore(1)}
                        >
                            Eneba
                        </a>
                        <a
                            className={`StoreSelect ${selectedStore === 2 ? 'selected' : ''}`}
                            onClick={() => setSelectedStore(2)}
                        >
                            GamersGate
                        </a>
                        <a
                            className={`StoreSelect ${selectedStore === 3 ? 'selected' : ''}`}
                            onClick={() => setSelectedStore(3)}
                        >
                            Steam
                        </a>
                        <a
                            className={`StoreSelect ${selectedStore === 4 ? 'selected' : ''}`}
                            onClick={() => setSelectedStore(4)}
                        >
                            2Game
                        </a>
                    </div>
                    <br />
                    <br />
                    <br />


                    {selectedStore === 1 ? (

                        <div className="gallery">
                            {data
                                .filter((item) => item.page === "eneba")
                                .map((item) => {
                                    return (
                                        <>
                                            <div style={{ display: "flex", flexDirection: "column" }} >
                                                <a className="Favorito" onClick={() => handleDeleteFavorite(item.idFuera)} >
                                                    <AiOutlineCloseCircle size={30} />
                                                </a>
                                                <a href={item.link} target="_blank">
                                                    <div className="cardGame">
                                                        <div>
                                                            <Image
                                                                src={item.image}
                                                                width={100}
                                                                height={100}
                                                                alt={item.nombre}
                                                                layout="responsive"
                                                            />
                                                        </div>
                                                        <div>
                                                            <a target="_blank">
                                                                {item.nombre}
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                <strong>
                                                                    Desde
                                                                </strong>
                                                            </p>
                                                            <span>${item.precio}</span>
                                                        </div>
                                                    </div>

                                                </a>

                                            </div>
                                        </>

                                    );
                                })}
                        </div>
                    ) : null}
                    {selectedStore === 2 ? (
                        <div className="gallery">
                            {data
                                .filter((item) => item.page === "gamersgate")
                                .map((item) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "column" }} >
                                            <a className="Favorito" onClick={() => handleDeleteFavorite(item.idFuera)} >
                                                    <AiOutlineCloseCircle size={30} />
                                                </a>
                                            <a href={item.link} target="_blank">
                                                <div className="cardGame">
                                                    <div>
                                                        <Image
                                                            src={item.image}
                                                            width={100}
                                                            height={100}
                                                            alt={item.nombre}
                                                            layout="responsive"
                                                        />
                                                    </div>
                                                    <div>
                                                        <a target="_blank">
                                                            {item.nombre}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <strong>
                                                                Desde
                                                            </strong>
                                                        </p>
                                                        <span>${item.precio}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : null}
                    {selectedStore === 3 ? (
                        <div className="gallery">

                            {data
                                .filter((item) => item.page === "Steam")
                                .map((item) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "column" }} >
                                           <a className="Favorito" onClick={() => handleDeleteFavorite(item.idFuera)} >
                                                    <AiOutlineCloseCircle size={30} />
                                                </a>
                                            <a href={item.link} target="_blank">
                                                <div className="cardGame">
                                                    <div>
                                                        <Image
                                                            src={item.image}
                                                            width={100}
                                                            height={100}
                                                            alt={item.nombre}
                                                            layout="responsive"
                                                        />
                                                    </div>
                                                    <div>
                                                        <a target="_blank">
                                                            {item.nombre}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <strong>
                                                                Desde
                                                            </strong>
                                                        </p>
                                                        <span>${item.precio}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : null}
                    {selectedStore === 4 ? (
                        <div className="gallery">
                            {data
                                .filter((item) => item.page === "2Game")
                                .map((item) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "column" }} >
                                           <a className="Favorito" onClick={() => handleDeleteFavorite(item.idFuera)} >
                                                    <AiOutlineCloseCircle size={30} />
                                                </a>
                                            <a href={item.link} target="_blank">
                                                <div className="cardGame">
                                                    <div>
                                                        <Image
                                                            src={item.image}
                                                            width={100}
                                                            height={100}
                                                            alt={item.nombre}
                                                            layout="responsive"
                                                        />
                                                    </div>
                                                    <div>
                                                        <a target="_blank">
                                                            {item.nombre}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <strong>
                                                                Desde
                                                            </strong>
                                                        </p>
                                                        <span>${item.precio}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : <div>
                        <h2>
                            No se encontraron más resultados
                        </h2>
                    </div>}


                </>
            )}




        </>
    )
}
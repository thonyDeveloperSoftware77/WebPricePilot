import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import MaterialReactTable from 'material-react-table';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

//Importar librerias de PrimeReact
import dynamic from 'next/dynamic';
//Importar libreria de Apex chart con server side rending deshabilitado
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

import { BsPersonFillUp, BsPersonFillDash } from "react-icons/bs"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import slide1 from "../public/slide1.png"
import { deletejuego, getjuego, getjuegoNombre } from "../controllers/juegos"
import { getfavoritoJuego } from "../controllers/favoritos";

export default function CategoriaNorma(props) {


    const notifyError = () => toast.error("Este Juego  no puede eliminarse ya que uno o varios usuarios lo han agredado a sus favoritos!");
    const notifyDelete = () => toast("Juego eliminado con éxito!");
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cantidadJuegos, setCantidadJuegos] = useState(0);


    const [fields, setFields] = useState({
        nombre: "",
    })

    const handleBusqueda = () => {
        getjuegoNombre(fields.nombre).then((res) => {
            const dataRenderTables = res.map((item) => {
                return {
                    nombre: item.nombre,
                    precio: item.precio,
                    image: item.image,
                    link: item.link,
                    page: item.page,
                };
            });
            setData(dataRenderTables);
            console.log(dataRenderTables)
        }).then(() => {
            setBusqueda(!busqueda)
            setShowModal(true)
        }).catch((err) => {
            console.log(err)
        });
    }
    const handleDelete = async (row) => {
        try {
            await getfavoritoJuego(row.original.id).then((res) => {
                if (res.msg != undefined) {
                    notifyDelete()
                    deletejuego(row.original.id).then(() => {
                        getjuego().then((res) => {
                            const dataRenderTables = res.map((item) => {
                                return {
                                    id: item.id,
                                    nombre: item.nombre,
                                    precio: item.precio,
                                    image: item.image,
                                    link: item.link,
                                    page: item.page,
                                };
                            });
                            setData(dataRenderTables);
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                    )
                }
                const dataRenderTables = res.favoritos.map((item) => {

                    return {
                        id: item.Juego.id,
                        nombre: item.Juego.nombre,
                        precio: item.Juego.precio,
                        image: item.Juego.image,
                        link: item.Juego.link,
                        page: item.Juego.page,
                    };
                });

                if (dataRenderTables.length > 0) {
                    notifyError()
                } else {
                    notifyDelete()

                }

            }).catch((err) => {
                console.log(err)
            }
            )
        } catch (err) {
            deletejuego(row.original.id).then(() => {
                getjuego().then((res) => {
                    const dataRenderTables = res.map((item) => {
                        return {
                            id: item.id,
                            nombre: item.nombre,
                            precio: item.precio,
                            image: item.image,
                            link: item.link,
                            page: item.page,
                        };
                    });
                    setData(dataRenderTables);
                }).catch((err) => {
                    console.log(err)
                });
            }
            )
        }



    }

    const globalTheme = useTheme();
    const tableTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
                    primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
                    info: {
                        main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
                    },
                    background: {
                        default:
                            globalTheme.palette.mode === 'dark'
                                ? 'rgb(254,255,244)' //random light yellow color for the background in light mode
                                : '#000', //pure black table in dark mode for fun
                    },
                },
                //change color of the table header text



                typography: {
                    body1: {
                        color: "white",
                    },
                    button: {
                        textTransform: 'none', //customize typography styles for all buttons in table by default
                        fontSize: '1.2rem',
                        color: 'white',
                    },
                },
                components: {
                    MuiTableCell: {
                        styleOverrides: {
                            head: {
                                color: "white",
                            },
                        },
                    },
                    MuiTooltip: {
                        styleOverrides: {
                            tooltip: {
                                fontSize: '1.1rem', //override to make tooltip font size larger
                            },
                        },
                    },
                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                color: "white",
                            },
                        },
                    },
                },
            }),
        [globalTheme],
    );

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                maxSize: 5,

                Cell: ({ row }) => (
                    <td style={{ color: "white" }}>{row.original && row.original.id ? row.original.id : ''}</td>
                ),
            },
            {
                accessorKey: 'nombre',
                header: 'Nombre',
                Cell: ({ row }) => (
                    <td style={{ color: "white" }}>{row.original && row.original.nombre ? row.original.nombre : ''}</td>
                ),
            }, {
                accessorKey: 'precio',
                header: 'Precio',
                Cell: ({ row }) => (
                    <td style={{ color: "white" }}>{row.original && row.original.precio ? `$ ${row.original.precio}` : ''}</td>
                ),

                maxSize: 5,
            }
            , {
                accessorKey: 'link',
                header: 'Link',
                Cell: ({ row }) => (
                    <a className="redirect" href={row.original.link} target="_blank">Visitar</a>
                ),

                maxSize: 5,
            }
            ,
            {
                accessorKey: 'actions2',
                header: 'Eliminar',
                Cell: ({ row }) => (
                    <button className='botonEliminar' onClick={() => handleDelete(row)}><BsPersonFillDash size={15} /> Eliminar</button>
                ),
            }
        ],
        [],
    );



    useEffect(() => {

        getjuego().then((res) => {
            const dataRenderTables = res.map((item) => {
                return {
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio,
                    image: item.image,
                    link: item.link,
                    page: item.page,
                };
            });
            setCantidadJuegos(dataRenderTables.length)
            setData(dataRenderTables);
            console.log(dataRenderTables)
        }).catch((err) => {
            console.log(err)
        });


    }, [busqueda]);
    return (
        <>
            <ToastContainer
                theme="dark"
                position="bottom-center"
            />
            <div class={showModal ? "modal-background" : "ocultarModal"}>
                <div class="modal">
                    <span class="close-button">&times;</span>
                    <div class="modal-content">
                        <h1>Perfecto!</h1>
                        <p>Búsqueda realizada con éxito, tenemos {cantidadJuegos} juegos registrados</p>
                    </div>
                    <button onClick={() => setShowModal(false)}>
                        Cerrar
                    </button>
                </div>
            </div>

            <h1>Juegos Registrados en Price Portal</h1>
            <div className="ContentText">
                <p className="textMorado">Deseas agregar más juegos?</p>
                <p>
                    Nuestro sistema se encarga de buscar los juegos en las tiendas más populares de internet y te muestra el precio más bajo.
                    <br />
                    Price Pilot busca juegos en tiendas como Steam, Eneba, 2Game en cuestión de segundos.
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <input placeholder="Buscar un Juego" type="text" name="nombre" onChange={(e) => setFields({ ...fields, nombre: e.target.value })} />
                <button onClick={() => handleBusqueda()}>Buscar</button>
            </div>

            <ThemeProvider theme={tableTheme}>
                <MaterialReactTable columns={columns} data={data} enableRowActions={false} />
            </ThemeProvider>

        </>
    )
}
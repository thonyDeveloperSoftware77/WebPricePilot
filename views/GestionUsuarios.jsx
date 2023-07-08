import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import MaterialReactTable from 'material-react-table';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

//Importar librerias de PrimeReact
import dynamic from 'next/dynamic';
//Importar libreria de Apex chart con server side rending deshabilitado
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

import { BsPersonFillUp, BsPersonFillDash } from "react-icons/bs"

import slide1 from "../public/slide1.png"
import { getjuego, getjuegoNombre } from "../controllers/juegos"
import { deleteusuario, getusuario } from "../controllers/usuarios";
import { deleteUser } from "firebase/auth";
import { getfavoritoUsuario } from "../controllers/favoritos";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GestionUsuarios(props) {
    
    const notifyError = () => toast.error("Este Usuario no puede eliminarse ya que es activo y tiene juegos favoritos!");
    const notifyDelete = () => toast("Usuario eliminado con éxito!");
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const [fields, setFields] = useState({
        nombre: "",
        idDelete: "",
    })

    const handleDelete = async (row) => {
        setShowModal(true)
        setFields({ ...fields, idDelete: row.original.id })

    }
    const deleteRow = async () => {
        await getfavoritoUsuario(fields.idDelete).then((res) => {
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
                deleteusuario(fields.idDelete)
                setUpdate(!update)
            }

        }).catch((err) => {
            console.log(err)
        }
        )

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
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ row }) => (
                    <td style={{ color: "white" }}>{row.original && row.original.email ? row.original.email : ''}</td>
                ),

            }

            , {
                accessorKey: 'fechaNacimiento',
                header: 'Fecha de Nacimiento',
                Cell: ({ row }) => (
                    <td style={{ color: "white" }}>{row.original && row.original.fechaNacimiento ? row.original.fechaNacimiento : ''}</td>
                ),

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

        getusuario().then((res) => {
            const dataRenderTables = res.map((item) => {
                return {
                    id: item.id,
                    nombre: item.nombre,
                    email: item.email,
                    fechaNacimiento: item.fechaNacimiento,
                };
            });
            setData(dataRenderTables);
            console.log(dataRenderTables)
        }).catch((err) => {
            console.log(err)
        });


    }, [update]);
    return (
        <>
            <ToastContainer
                theme="dark"
                position="bottom-center"
            />

            <h1>Usuarios Registrados en Price Pilot</h1>
            <div class={showModal ? "modal-background" : "ocultarModal"}>
                <div class="modal">
                    <span class="close-button">&times;</span>
                    <div class="modal-content">
                        <h1>Eliminación</h1>
                        <p>Estás seguro que deseas eliminar a este usuario?</p>
                    </div>
                    <div>
                        <button onClick={() => deleteRow()}>
                            <BsPersonFillDash size={15} /> Eliminar
                        </button>
                        <button onClick={() => setShowModal(false)} >
                            <BsPersonFillUp size={15} /> Cancelar
                        </button>

                    </div>
                </div>
            </div>
            <div style={{ marginTop: "100px" }}>
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable columns={columns} data={data} enableRowActions />
                </ThemeProvider>

            </div>

        </>
    )
}
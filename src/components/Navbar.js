
import './Navbar.css'
import { useNavigate } from 'react-router-dom'



export default function Navbar() {

    let navigate = useNavigate()

    const logout = () => {
        try {
            console.log("click")
            localStorage.removeItem("user")
            navigate("/")
        }
        catch {
            console.log("error al remover user de localStorage")
        }
    }

    // let nombre = "cargando..."
    // let esAdmin = "cargando..."
    // const user = JSON.parse(localStorage.getItem("user"))
    // if (user) {
    //     // console.log(nombre)
    //     nombre = user.nombre
    //     esAdmin = user.esAdmin ? "Admin" : "Regular"
    //     // console.log("mostrando user",nombre)
    // }
    // else {
    //     console.log("no hay user")
    // }




    return (
        <>
            {/* {console.log(user)} */}
            {/* {console.log(user.nombre)} */}
            <div className="navbar-contenido">
                <div className="navContent">
                    <div className="navbar_right-item">
                        {/* <div className="user_image">
                        <img src={curr_user.image} alt="" />
                    </div> */}

                        {/* <div className="user_name">
                            <h3>{nombre}</h3>
                        </div>
                        <div className="user_carga">
                            <h3>{esAdmin}</h3>
                        </div> */}

                        <div className="btn_salir">

                            <button className="btn btn-danger"
                                onClick={logout}>
                                Salir
                            </button>
                            {/* <input type="button" value="aaa" /> */}
                            {/* <button>mama</button> */}

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}



{/* <div className="navbar_search">
                    <input type="search" placeholder='Search here...' />
                    <i className='fa fa-search'></i>
                </div> */}

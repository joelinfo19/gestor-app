import React from 'react'
import './Perfil.css'

export default function Perfil() {
    return (
        <>
            <h1>Perfil</h1>
            <div className="contenedor">
                <div className="contenedorcentrado">
                    <div className="cabeza">
                        <div className="fotoperfil">
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg' />
                        </div>

                    </div>
                    <hr />
                    <form action="">
                    <div className="perfil">
                        <div className="input-contenedor">
                            <i className="fas fa-user icon"></i>
                            <input type="text" placeholder="Nombre completo" required />
                        </div>
                        <div className="input-contenedor">
                            <i className="fas fa-envelope icon"></i>
                            <input type="text" placeholder="Correo electronico" required />
                        </div>
                        <div className="input-contenedor">
                            <i className="fas fa-key icon"></i>
                            <input type="password" placeholder="Contraseña" required />
                        </div>
                        <div className="button-contenedor">
                            <input className="button" type="submit" value="Guardar" />
                            <input className="button" type="submit" value="Editar" />
                        </div>

                    </div>
                    </form>
                </div>
            </div>
        </>
    )

}


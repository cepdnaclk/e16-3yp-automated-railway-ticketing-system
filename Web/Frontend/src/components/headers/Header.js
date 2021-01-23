import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li class="nav-item"><Link class="nav-link" to="/customer">Customer</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/user">App User</Link></li>
            </>
        )
    }
    
    const clientRouter = () =>{
        return(
            <>
                <li class="nav-item"><Link class="nav-link" to="/profile">Profile</Link></li>

                <li class="nav-item"><Link class="nav-link" to="/travels">History</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>

                <li class="nav-item"><Link class="nav-link" to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <Link class="navbar-brand"  to='/'>R  T  S</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <Link class="nav-link" to="/">Home</Link>
            </li>
            
        
            {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </li> */}
            {!isAdmin && isLogged && clientRouter()}
            {isAdmin && isLogged && adminRouter()}

            {
                    isLogged ? loggedRouter() : <li><Link class="nav-link" to="/login">Login ✥ Register</Link></li>
            }

            </ul>
            
        </div>
        </nav>
    </>
        // <header>
        //     <div className="menu" onClick={() => setMenu(!menu)}>
        //         <img src={Menu} alt="" width="30" />
        //     </div>

        //     <div className="logo">
        //         <h1>
        //             <Link to="/">{isAdmin ? 'Admin' : <img src={logo} alt="" width="200" />}</Link>
        //         </h1>
        //     </div>

        //     <ul style={styleMenu}>
        //         <li><Link to="/profile">{isAdmin ? 'Products' : 'Profile'}</Link></li>

        //         

        //         {
        //             isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
        //         }

        //         <li onClick={() => setMenu(!menu)}>
        //             <img src={Close} alt="" width="30" className="menu" />
        //         </li>

        //     </ul>
  
        // </header>
    )
}

export default Header

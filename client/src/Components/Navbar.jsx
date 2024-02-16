import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Navbar()
{
    const loggedData=useContext(UserContext)
    const navigate=useNavigate()

    function logout()
    {
        localStorage.removeItem('userData')
        loggedData.setLoggedUser(null)

        navigate('/login')

    }

    return(
        <div className="navbar">

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link className="logout" onClick={logout}>Logout</Link></li>
            </ul>

        </div>
    )

}
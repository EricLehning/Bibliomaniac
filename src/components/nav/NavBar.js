import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/books">My Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/newReadingList">New Reading List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/donationBin">Donation Bin</Link>
            </li>
            {
                localStorage.getItem("biblio_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("biblio_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}


import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    };

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src="https://i.pinimg.com/originals/ff/c3/d3/ffc3d3f7e25c28ea2d3fe42231736f00.png"
                    alt="logo"
                />
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"}>
                    <div
                        onClick={handleAuthentication}
                        className="header__option"
                    >
                        <span className="header__optionLineOne">
                            Hello, {user ? user.email : "Guest"}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Orders</span>
                    </div>
                </Link>

                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon />
                        <span className="header__optionLineOne header__basketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;

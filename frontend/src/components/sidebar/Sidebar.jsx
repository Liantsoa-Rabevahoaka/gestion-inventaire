import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Link } from "react-router-dom";


const Sidebar = () => {
  return  (
    <div className="sidebar">
        <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">Inventories</span>
            </Link>          
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>

                <li>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>

                <p className="title">LISTS</p>
                                
                <Link to="/articles" style={{ textDecoration: "none" }}>
                    <li>
                        <CreditCardOutlinedIcon className="icon"/>
                        <span>Articles</span>
                    </li>
                </Link>

                <Link to="/zones" style={{ textDecoration: "none" }}>
                    <li>
                        <StoreOutlinedIcon className="icon"/>
                        <span>Zones</span>
                    </li>
                </Link>

                <li>
                    <LocalShippingOutlinedIcon className="icon"/>
                    <span>Delivery</span>
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
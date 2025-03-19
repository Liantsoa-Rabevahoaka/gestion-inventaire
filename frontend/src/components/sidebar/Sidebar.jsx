import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'

const Sidebar = () => {
  return  (
    <div className="sidebar">
        <div className="top">
            <span className="logo">Inventories</span>
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
                
                <li>
                    <CreditCardOutlinedIcon className="icon"/>
                    <span>Articles</span>
                </li>
                <li>
                    <StoreOutlinedIcon className="icon"/>
                    <span>Zones</span>
                </li>
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
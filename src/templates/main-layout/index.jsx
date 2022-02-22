import {Link} from "react-router-dom"
import { Content, Nav } from "./styles"
export const MainLayout = ({children}) => {
    return (
        <div>
            <Nav>
                <ul>
                    <li><Link className="link" to="/">Home</Link></li>
                    <li><Link className="link" to="/about">About us</Link></li>
                    <li><Link className="link"  to="/contact">Contact us</Link></li>
                </ul>
            </Nav>
            <Content>
                {children}
            </Content>
        </div>
    )
}
import logo from '../img/logo.jpg';
export default function Header() {
    return (
       <header>
         <nav className="nav">
            <div className="league">
              <img src={logo} className="logo" />
              <span className="league-name">FantaFavaro</span>
            </div>
            <ul className="nav-items">
              <li><a href="#">Squadre</a></li>
              <li><a href="#">Svincolati</a></li>
            </ul>
         </nav>
       </header>
    )
}

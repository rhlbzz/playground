import { useLocation } from "react-router-dom";
import CtaComponent from "../components/atoms/CtaComponent";

export default function Header() {
    const location = useLocation();
    console.log(location);

    return (
    <header 
      className={`fixed top-0 left-0 right-0 p-2 h-auto bg-teal z-2 flex items-center ${location.pathname !== '/' ? 'justify-between' : 'justify-end' }`}
      >   
      { location.pathname !== "/" &&  
        <CtaComponent to="/">🏠</CtaComponent> 
      }
      <CtaComponent href="https://www.rhlbzz.com">// rhlbzz</CtaComponent>
    </header>
    )
}
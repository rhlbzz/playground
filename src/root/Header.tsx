import CtaComponent from "../components/atoms/CtaComponent";

export default function Header() {

    return (
    <header className="fixed top-0 left-0 right-0 p-1 h-auto bg-teal z-2 flex items-center justify-between">        
      <CtaComponent to="/">🏠</CtaComponent> 
      <CtaComponent href="https://www.rhlbzz.com">// rhlbzz</CtaComponent>
    </header>
    )
}
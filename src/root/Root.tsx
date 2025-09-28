import { Outlet } from 'react-router-dom';
// import NavBar from './NavBar'; // Esempio di un componente fisso
// import Footer from './Footer'; // Esempio di un componente fisso

function Root() {
  return (
    <div>
      {/* Elementi comuni a tutte le pagine */}
      {/* <NavBar />  */}
      
      {/* L'area in cui verrà renderizzata la pagina corrente */}
      <main className='relative min-h-screen'>
        <Outlet /> 
      </main>
      
      {/* Elementi comuni a tutte le pagine */}
      {/* <Footer /> */}
    </div>
  );
}

export default Root;
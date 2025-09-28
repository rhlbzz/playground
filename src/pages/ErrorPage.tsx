import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError(); // Ottieni l'oggetto errore

  console.error(error);

  // Type guard for error object
  const err = typeof error === "object" && error !== null ? error as { status?: string; statusText?: string; message?: string } : {};

  return (
    // Il JSX che definisce l'interfaccia utente della pagina
    <div className="safe-area bg-red c-gray size-screen flex items-center justify-center flex-col text-center">
      <p className="p">It's seems that something went wrong 😕 ...</p>
      <h1 className="head-2">Error {err.status || 'Unknown'}</h1>
      <p className="p">Reason: {err.statusText || 'Unknown'}</p>
      <p className="p">{err.message || 'No additional information available.'}</p>
    </div>
  );
}
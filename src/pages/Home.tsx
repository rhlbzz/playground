import CtaComponent from "../components/atoms/CtaComponent";

export default function HomePage() {
  return (
    <div className="safe-area">
      <div className="w-full mb-6">
        <p className="p">Hi there! 👋🏼</p>
        <h1 className="p">I'm Rachele Bizzarri.</h1>
        <p className="p">I'm using this space as a playground, feel free to look around 🙃 !</p>
      </div>
      <CtaComponent  to="/torch-effect">Torch Effect</CtaComponent> 
    </div>
  );
}
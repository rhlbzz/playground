import InternalLink from "../components/atoms/InternalLink";

export default function HomePage() {
  return (
    <div className="safe-area mb-6">
      <div className="w-full text-center">
        <p className="p">Hi there! 👋🏼 I'm</p>
        <h1 className="head-2">
          <a 
          href="https://www.rhlbzz.com/"
          className="underline underline-offset-4 decoration-2 decoration-$c-purpled hover:decoration-$c-white transition-all"
          target="_blank"
          rel="nofollow noopener noreferrer">
            Rachele Bizzarri
          </a>
        </h1>
        <p className="p">I'm using this space as a playground.</p>
        <p className="head-4">Feel free to look around 🙃 !</p>
      </div>
      <InternalLink  to="/torch-effect">Torch Effect</InternalLink> 
    </div>
  );
}
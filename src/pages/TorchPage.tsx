import TorchEffect from "../components/organisms/TorchEffect";
import bw from '../assets/imgs/bw.jpg?url';
import defaultImg from '../assets/imgs/default.jpg?url';

export default function TorchPage() {
  const background = {
    src: bw,
  }
  const foreground = {
    src: defaultImg,
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-black">
      <div className="fixed top-1 left-1 z-2 blurred-bg">
        <h1 className="head-3">Torch Effect</h1>
        <p className="p">Move your mouse around to see the effect</p>
      </div>

      <TorchEffect background={background} foreground={foreground} />
    </div>
  )
};

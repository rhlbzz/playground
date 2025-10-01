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
    <div className="w-[100vw] h-[100vh] safe-area relative flex justify-center items-center">

      <TorchEffect background={background} foreground={foreground} />
      
      <div className="absolute text-center p-5 safe-top w-[auto] left-[50%] transform translate-x-[-50%] blurred-bg">
        <p className="p">Move your mouse around to see the effect</p>
      </div>
    </div>
  )
};

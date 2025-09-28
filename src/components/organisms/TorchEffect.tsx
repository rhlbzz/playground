import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import type { MediaAsset } from "../../types";

export default function TorchEffect(props: { background: MediaAsset, foreground: MediaAsset}) {
  const { width, height} = useWindowSize();
  const [brushSize, setBrushSize] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [assets, setAssets] = useState<{ background: HTMLImageElement, foreground: HTMLImageElement } | null>(null);
  const [imagesReady, setImagesReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number>(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctxRef.current = canvas.getContext('2d');
    ctxRef.current?.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const loadImages = useCallback(async () => {
    if (!props.background.src || !props.foreground.src) {
      console.log('No image sources provided');
      return;
    }
    
    const background = new Image();
    const foreground = new Image();
    
    return new Promise<{ background: HTMLImageElement, foreground: HTMLImageElement }>((resolve) => {
      let count = 0;
      
      const onLoad = () => {
        count++;
        console.log('Image loaded, count:', count);
        if (count === 2) {
          console.log('All images loaded');
          setAssets({ background, foreground });
          setImagesReady(true);
          resolve({ background, foreground });
        }
      }

      const onError = (error: string | Event) => {
        console.error('Image failed to load:', error);
        count++;
        if (count === 2) {
          setAssets({ background, foreground });
          setImagesReady(true);
          resolve({ background, foreground });
        }
      }

      background.onload = () => { 
        console.log('background loaded');
        onLoad() 
      };
      background.onerror = onError;
      
      foreground.onload = () => { 
        console.log('foreground loaded');
        onLoad() 
      };
      foreground.onerror = onError;
      
      background.src = props.background.src;
      foreground.src = props.foreground.src;
    })
  }, [props.background.src, props.foreground.src]);

  const render = useCallback(() => {
    if (!canvasRef.current || !ctxRef.current || !assets?.background || !assets.foreground || !imagesReady) return;

    if (!assets.background.complete || !assets.foreground.complete || assets.background.naturalWidth === 0 || assets.foreground.naturalWidth === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(assets.background, 0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
    ctx.save();
    
    const gradient = ctx.createRadialGradient(
      mousePos.x, mousePos.y, 0,
      mousePos.x, mousePos.y, brushSize * 0.5
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.98)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(0.95, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(0.98, 'rgba(255, 255, 255, 0.03)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;
    const tmpCtx = tmpCanvas.getContext('2d');
    if (!tmpCtx) return;
    tmpCtx.drawImage(assets.foreground, 0, 0, canvas.width, canvas.height);
    tmpCtx.globalCompositeOperation = 'destination-in';
    tmpCtx.fillStyle = gradient;
    tmpCtx.fillRect(0, 0, canvas.width, canvas.height);
    tmpCtx.filter = 'blur(10px)';
    tmpCtx.drawImage(tmpCanvas, 0, 0);
    ctx.drawImage(tmpCanvas, 0, 0);
    ctx.restore()

    animationFrameRef.current = requestAnimationFrame(render);
  }, [assets, imagesReady, mousePos, brushSize]);

  // Esegui loadImages e resize all'avvio
  useEffect(() => {
    const initialize = async () => {
      console.log('Initializing component...');
      await loadImages();
      resize();
    };
    
    initialize();
  }, [loadImages, resize]);

  useEffect(() => {
    if (!height) return;
    const baseHeight = 800;
    const baseBrushSize = 400;
    setBrushSize(baseBrushSize * (height / baseHeight));
    resize()
  }, [width, height, resize]);

  // Gestisci event listener correttamente
  useEffect(() => {
    const handleResize = () => resize();
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMoveEvent);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveEvent);
    };
  }, [resize, handleMouseMove]);

  useEffect(() => { 
    if (assets && imagesReady) animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [assets, imagesReady, render]);

  return (
    <div className="size-full relative">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
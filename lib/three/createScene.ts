import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  type WebGLRendererParameters,
} from "three";

export interface SceneHandle {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  /** Start the RAF loop. tick(time, dt) is called each frame. */
  start: (tick: (time: number, dt: number) => void) => void;
  /** Stop RAF + dispose renderer + remove resize listener. Call on unmount. */
  dispose: () => void;
}

interface CreateSceneOptions {
  canvas: HTMLCanvasElement;
  /** Camera FOV in degrees. Default 50. */
  fov?: number;
  /** Renderer DPR cap. Default min(devicePixelRatio, 2). */
  dpr?: number;
  /** Pass through to WebGLRenderer. */
  rendererParams?: Omit<WebGLRendererParameters, "canvas">;
}

/**
 * Vanilla Three.js scene factory. Handles renderer setup, resize, and cleanup
 * so component code only deals with scene contents + per-frame logic.
 */
export function createScene({
  canvas,
  fov = 50,
  dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
  rendererParams,
}: CreateSceneOptions): SceneHandle {
  const scene = new Scene();
  const camera = new PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.z = 3;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    ...rendererParams,
  });
  renderer.setPixelRatio(dpr);

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { clientWidth: w, clientHeight: h } = parent;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let rafId = 0;
  let lastTime = 0;
  let started = false;

  const start: SceneHandle["start"] = (tick) => {
    started = true;
    const loop = (time: number) => {
      const dt = lastTime === 0 ? 0 : (time - lastTime) / 1000;
      lastTime = time;
      tick(time / 1000, dt);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  };

  const dispose: SceneHandle["dispose"] = () => {
    if (started) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };

  return { scene, camera, renderer, start, dispose };
}

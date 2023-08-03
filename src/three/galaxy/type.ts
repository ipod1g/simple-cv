export type TMeshOptions = {
  particle_size: number;
  particle_size_frequency: number;
  particle_size_dispersion: number;
  time_scale: number;
  twist_speed: number;
  twist_dispersion: number;
  twist_dispersion_frequency: number;
  twist_frequency: number;
  twist_amplitude: number;
  rotation_speed: number;
  rotation_dispersion: number;
  frequency: number;
  amplitude: number;
  offset: number;
  opacity: number;
  cone_shape: number;
  color: string;
  instance_count: number;
  min_radius: number;
  max_radius: number;
};

export interface IThree {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshNormalMaterial;
  mesh?: THREE.Mesh;
  time: number;
  addMesh(): void;
  render(): void;
}

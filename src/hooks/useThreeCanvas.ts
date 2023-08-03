import { useRef, useCallback, useEffect } from 'react';
import Galaxy from '@/three/galaxy/scene';

export const useThreeCanvas = (id: string, scene: 'galaxy') => {
  const instance = useRef<Galaxy>();

  const init = useCallback(() => {
    if (instance.current) {
      instance.current.resize();
      return console.log('Instance Already Initialized');
    }
    const element = document.getElementById(id);
    if (!element) return console.log('Element Not Found');

    switch (scene) {
      case 'galaxy':
        instance.current = new Galaxy({
          dom: element,
        });
        break;
      default:
        instance.current = new Galaxy({
          dom: element,
        });
        break;
    }
  }, [id, instance, scene]);

  useEffect(() => {
    init();
    return () => {};
  }, [init]);

  return instance;
};

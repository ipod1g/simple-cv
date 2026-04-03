import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Dither from "@/three/dither/Dither";

const Background = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <picture>
      <div
        className={`h-screen w-screen fixed inset-0 transition-opacity duration-1000 -z-10 opacity-0 ${
          resolvedTheme === "dark"
            ? "bg-white/50 animate-fadeOut1"
            : "bg-black animate-fadeOut2"
        }`}
      ></div>
      <div className="w-full h-full fixed inset-0 -z-10">
        {resolvedTheme === "dark" ? (
          <Dither
            backgroundColor={[0, 0, 0]}
            waveColor={[0.3, 0.3, 0.3]}
            invertPattern={false}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.2}
            colorNum={4}
            waveAmplitude={0.5}
            waveFrequency={4}
            waveSpeed={0.01}
          />
        ) : (
          <Dither
            backgroundColor={[0.94, 0.93, 0.9]}
            waveColor={[0.42, 0.45, 0.5]}
            invertPattern={false}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.2}
            colorNum={4}
            waveAmplitude={0.5}
            waveFrequency={4}
            waveSpeed={0.01}
          />
        )}
      </div>
    </picture>
  );
};

export default Background;

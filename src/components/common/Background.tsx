import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import LightPillar from "@/three/light-pillar/LightPillar";

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
          <LightPillar
            topColor="#c9a96e"
            bottomColor="#f2d39e"
            intensity={1}
            rotationSpeed={0.4}
            className="w-full h-full"
            glowAmount={0.0035}
            pillarWidth={2.4}
            pillarHeight={0.4}
            pillarRotation={64}
            noiseIntensity={1}
            mixBlendMode="screen"
          />
        ) : (
          <LightPillar
            backgroundColor="#dbd7d1"
            topColor="#6d6258"
            bottomColor="#9a8b7a"
            intensity={1}
            rotationSpeed={0.4}
            className="w-full h-full"
            glowAmount={0.003}
            pillarWidth={2.4}
            pillarHeight={0.4}
            pillarRotation={64}
            noiseIntensity={1}
            mixBlendMode="screen"
          />
        )}
      </div>
    </picture>
  );
};

export default Background;

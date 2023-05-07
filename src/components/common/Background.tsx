import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
// static import can allow use of placeholder easier

const Background = () => {
  const { resolvedTheme } = useTheme();
  let src;

  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (resolvedTheme) {
    case 'light':
      src = '/assets/ingrid-salmanca-Y6OKbIFe4Z0-unsplash_3.jpg';
      break;
    case 'dark':
      src = '/assets/spaceloop-blur.webp';
      break;
    default:
      src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

  return (
    <picture>
      <Image
        className="h-full object-cover fixed -z-10 inset-0 opacity-10 blur-sm object-left lg:object-center"
        src={src}
        width={1920}
        height={1080}
        alt={'Background Image'}
      />
    </picture>
  );
};

export default Background;

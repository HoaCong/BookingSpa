/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

function useLazyLoadImage(src, defaultImage) {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };

    image.onerror = () => {
      setLoaded(true);
      setImageSrc(defaultImage);
    };
  }, [src]);

  return { imageSrc, isLoaded };
}

function LazyLoadImage({ src, alt, ...restProps }) {
  const { imageSrc } = useLazyLoadImage(
    src,
    "https://centbeauty.com/assets/images/logo-booking.svg"
  );

  return <img id="image_lazyload" src={imageSrc} alt={alt} {...restProps} />;
}

export default LazyLoadImage;

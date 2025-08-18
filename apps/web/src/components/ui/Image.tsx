interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = ({ src, alt, ...props }: ImageProps) => {
  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/images/placeholder.svg";
  };

  return <img src={src} alt={alt} loading="lazy" onError={onError} {...props} />;
};

export default Image;

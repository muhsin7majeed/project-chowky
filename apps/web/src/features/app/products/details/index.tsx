interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  return <div>ProductDetails {slug}</div>;
};

export default ProductDetails;

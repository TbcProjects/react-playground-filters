import { Box, Text, Image } from "@chakra-ui/react";

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
}

const ProductCard = ({ title, image, price }: ProductCardProps) => {
  return (
    <Box border="1px solid lightgrey" borderRadius="5px">
      <Text>{title}</Text>
      <Box>
        <Image src={image} height="100%" width="100%" />
      </Box>
      <Text>{price}</Text>
    </Box>
  );
};

export default ProductCard;

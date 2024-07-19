import { pizzas } from "@/data";
import { Tables } from "@/database.types";
import { discountCalculator } from "@/lib/discountCalculator";
import { priceTag } from "@/lib/priceTage";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import ProductImage from "./ProductImage";
import { isNewProduct } from "@/lib/isNewProduct";

interface CardProps {
  product: Tables<"products">;
}
const CardItem = ({ product }: CardProps) => {
  const isNew = isNewProduct(product.created_at);
  return (
    <Card
      bg={"#050152"}
      borderRadius={"0"}
      data-aos="zoom-in-up"
      data-aos-duration="1500"
    >
      <CardHeader>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Heading size="md" color={"#FF9C01"}>
            {product.name}
          </Heading>
          {isNew && (
            <Badge ml="1" colorScheme="green" borderRadius={"0"}>
              New
            </Badge>
          )}
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider borderColor={"#FF9C01"} />} spacing="4">
          {product.image && pizzas[0].img && (
            <Box position={"relative"} height={"150px"}>
              <ProductImage
                fallback={pizzas[0].img}
                path={product.image}
                radius="rounded-lg"
              />
            </Box>
          )}
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xs"} bg={"#FF9C01"} p={"4px"}>
              {priceTag(product.price)}
            </Text>
            {product.discount && (
              <Text
                fontSize={"xs"}
                bg={"#ff0101"}
                p={"4px"}
                textDecoration={"line-through"}
                color={"#fff"}
              >
                {priceTag(product.discount)}
              </Text>
            )}
            {product.discount && product.discount > product.price && (
              <Text color={"#FF9C01"}>
                -{discountCalculator(product.price, product.discount)}
              </Text>
            )}
          </Flex>
          {product.description && (
            <Box>
              <Text pt="2" fontSize="sm" color={"#fff"}>
                {product.description}
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardItem;

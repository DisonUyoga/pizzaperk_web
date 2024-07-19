import {
  CartItems,
  decreaseQuantity,
  increaseQuantity,
} from "@/app/features/slices/cartSlice";
import { pizzas } from "@/data";
import { useAppDispatch } from "@/lib/hook";
import { priceTag } from "@/lib/priceTage";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
import ProductImage from "./ProductImage";
import NextLink from "next/link";

interface CartCardProps {
  cartItem: CartItems;
}
const CartCard = ({ cartItem }: CartCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <Link as={NextLink} href={`/product/${cartItem.id}`}>
      <Flex
        alignContent={"center"}
        justifyContent={"space-between"}
        borderRadius={"0"}
        bg={"#050152"}
        p="10px"
        columnGap={5}
        h={"90px"}
        w={"100%"}
      >
        <Box position={"relative"} w={"60px"}>
          {pizzas[0].img && cartItem.image && (
            <ProductImage fallback={pizzas[0].img} path={cartItem.image} />
          )}
        </Box>
        <Flex
          direction={"column"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize={"xs"} color={"#FF9C01"}>
            {cartItem.name}
          </Text>
          <Text fontSize={"xs"} color={"#fff"}>
            {priceTag(cartItem.price)}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <HStack spacing={"20px"} p={0} m={0}>
            <AddIcon
              w={4}
              h={4}
              color={"#ffff"}
              onClick={() => dispatch(increaseQuantity(cartItem))}
            />
            <Text color={"#fff"}>{cartItem.quantity}</Text>
            <MinusIcon
              w={4}
              h={4}
              color={"#ffff"}
              onClick={() => dispatch(decreaseQuantity(cartItem))}
            />
          </HStack>
          <Text fontSize={"xs"} color={"#FF9C01"}>
            Update
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default CartCard;

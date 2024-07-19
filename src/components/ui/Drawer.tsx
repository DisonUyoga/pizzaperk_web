"use client";

import { useAppSelector } from "@/lib/hook";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import CartCard from "./CartCard";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function DrawerComponent({ isOpen, onClose }: DrawerProps) {
  const [placement, setPlacement] = useState<any>("right");
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Cart</DrawerHeader>
          <DrawerBody>
            <VStack spacing={5} p={0} m={0}>
              {cartItems.length > 0 ? (
                cartItems.map((c) => <CartCard key={c.id} cartItem={c} />)
              ) : (
                <Text>No Item in Cart</Text>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

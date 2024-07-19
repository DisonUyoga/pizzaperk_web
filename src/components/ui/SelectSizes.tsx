import { PizzaSize } from "@/type";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

interface SelectSizeProps {
  sizes: PizzaSize;
  handleSelected: (size: PizzaSize) => void;
  selected: string;
}
const SelectSize = ({ sizes, handleSelected, selected }: SelectSizeProps) => {
  return (
    <Button
      onClick={() => handleSelected(sizes)}
      bg={selected === sizes ? `#FF9C01` : ""}
    >
      {sizes}
    </Button>
  );
};

export default SelectSize;

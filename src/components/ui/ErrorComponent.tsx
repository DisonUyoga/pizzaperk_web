import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
interface ErrorProps{
    name: string
    message:string
}
const ErrorComponent = ({name, message}:ErrorProps) => {
  return <Alert status="error">
  <AlertIcon />
  <AlertTitle>{name}</AlertTitle>
  <AlertDescription>{message}</AlertDescription>
</Alert>;;
};

export default ErrorComponent;

import { Center, CircularProgress } from "@chakra-ui/react";
import React from "react";

interface props {}

const LoadingIndicator: React.FC<props> = () => {
  return (
    <Center
      top="0"
      left="0"
      h="full"
      w="full"
      zIndex={10}
      position="fixed"
      backgroundColor="rgba(0, 0, 0, 0.5)"
    >
      <CircularProgress isIndeterminate />
    </Center>
  );
};

export default LoadingIndicator;

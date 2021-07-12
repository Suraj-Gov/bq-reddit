import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
import {
  Center,
  HStack,
  Button,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Circle,
  Tooltip,
  chakra,
  Flex,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  setOffset: Dispatch<SetStateAction<number>>;
  intervalVal: number;
  offsetVal: number;
  rowCount: number;
}
const Paginator: React.FC<props> = ({
  setOffset,
  intervalVal,
  offsetVal,
  rowCount,
}) => {
  const currentPage = offsetVal / intervalVal + 1;
  const [sliderVal, setSliderVal] = useState(currentPage);

  return (
    <Center
      backgroundColor="green.800"
      backdropBlur="8px"
      padding="2"
      position="fixed"
      bottom="0"
      left="0"
      w="full"
      zIndex={10}
    >
      <HStack spacing="8">
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={() =>
            setOffset((prev: number) => Math.max(0, prev - intervalVal))
          }
        >
          Previous
        </Button>
        <Flex>
          <NumberInput
            maxW="32"
            mr="8"
            value={sliderVal}
            onChange={(_, num) => {
              setOffset((num - 1) * intervalVal);
              setSliderVal(num);
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex="1"
            minW="40"
            focusThumbOnChange={false}
            value={sliderVal}
            min={1}
            max={Math.floor(rowCount / intervalVal)}
            onChange={(num) => setSliderVal(num)}
            onChangeEnd={(num) => setOffset((num - 1) * intervalVal)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize="8" />
          </Slider>
        </Flex>
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={() =>
            setOffset((prev: number) => Math.min(prev + intervalVal, rowCount))
          }
        >
          Next
        </Button>
      </HStack>
    </Center>
  );
};

export default Paginator;

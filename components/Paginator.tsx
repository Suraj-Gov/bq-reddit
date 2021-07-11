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
  const [internalSliderVal, setInternalSliderVal] = useState(offsetVal);

  useEffect(() => {
    setInternalSliderVal(offsetVal);
  }, [offsetVal]);

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
        <Slider
          onChange={(val) => setInternalSliderVal(val)}
          onChangeEnd={(val) => setOffset(val)}
          w="72"
          step={intervalVal}
          value={internalSliderVal}
          max={rowCount}
        >
          <SliderTrack color="green.100">
            <SliderFilledTrack color="green.300" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Tooltip isOpen label={internalSliderVal}>
              <Circle as={DragHandleIcon} color="green.700" />
            </Tooltip>
          </SliderThumb>
        </Slider>
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

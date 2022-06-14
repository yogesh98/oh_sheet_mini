import CardComponent from 'components/Card/CardComponent';
import {
    ICue,
} from "types/types";
import { Box, Flex } from '@chakra-ui/react';

export interface ICueComponentProps {
    cue: ICue;
}

export default function CueComponent (props: ICueComponentProps) {
  return (
    <Flex h="90%" w="90%" key={props.cue.cue} direction='column' justifyContent='space-between' alignItems={'start'}>
        {Object.keys(props.cue).map((key, index) => {
            return (
                <Box key={index}>
                    {key}: {props.cue[key]}
                </Box>
            );
        })}
    </Flex>
  );
}

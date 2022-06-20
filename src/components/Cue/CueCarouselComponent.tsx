import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import CueComponent from "components/Cue/CueComponent";
import {
    ICue,
} from "types/types";

export interface ICueCarouselComponentProps {
    className?: string;
    cues: ICue[];
    currentPtr: number;
}

export function CueCarouselComponent (props: ICueCarouselComponentProps) {
    const currentCue = props.cues[props.currentPtr];
    const prevCue = props.currentPtr > 0 ?  props.cues[props.currentPtr - 1] : null;
    const nextCue = props.currentPtr < props.cues.length ? props.cues[props.currentPtr + 1] : null;
    // const numCols = useBreakpointValue({ xl: 3, base: 2 }) || 2;
    const numCols = useBreakpointValue({ xl: 2, base: 2 }) || 2;

    return (
        <Box id={"cue_carousel"} w="100%" h={"100%"} className={props.className}>
            <Flex w="100%" h="100%" justifyContent="space-between" alignItems="stretch">
                {numCols === 3 ? 
                <Flex
                    m={1}
                    w={`${100 / numCols}%`}
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="red.500" 
                    direction={'column'}
                >
                    <Flex 
                        w={"100"} 
                        h={"5%"} 
                        justifyContent="center" 
                        alignItems="center"
                        borderBottomWidth='2px'
                        borderBottomColor="red.500"
                    >
                        Previous
                    </Flex>
                    <Flex 
                        w={"100"} 
                        h={"95%"}
                        justifyContent="center" 
                        alignItems="center"
                    >
                        {prevCue ?  <CueComponent view="prev" cue={prevCue} /> : <Heading size={"md"}>N/A</Heading>}                
                    </Flex>
                </Flex>
                : null}
                <Flex 
                    m={1}
                    w={`${100 / numCols}%`}
                    direction={'column'}
                >
                    <Flex 
                        w={"100"} 
                        h={"5%"} 
                        justifyContent="center" 
                        alignItems="center"
                        borderTopWidth='2px'
                        borderTopColor="green.500"
                        borderLeftWidth='2px'
                        borderLeftColor="green.500"
                        borderRightWidth='2px'
                        borderRightColor="green.500"
                        borderTopRadius="lg"
                    >
                        Current
                    </Flex>
                    <Flex 
                        w={"100"} 
                        h={"95%"}
                        justifyContent="center" 
                        alignItems="center"
                    >
                        {currentCue ?  
                        <CueComponent
                            view="curr" 
                            cue={currentCue} 
                            borderWidth='2px'
                            borderRadius='lg'
                            borderColor="green.500" 
                         /> 
                         : <Heading size={"md"}>N/A</Heading>}
                    </Flex>
                </Flex>
                <Flex 
                    m={1}
                    w={`${100 / numCols}%`}
                    direction={'column'}
                >
                    <Flex 
                        w={"100"} 
                        h={"5%"} 
                        justifyContent="center" 
                        alignItems="center"
                        borderTopWidth='2px'
                        borderTopColor="blue.500"
                        borderLeftWidth='2px'
                        borderLeftColor="blue.500"
                        borderRightWidth='2px'
                        borderRightColor="blue.500"
                        borderTopRadius="lg"
                    >
                        Next
                    </Flex>
                    <Flex 
                        w={"100"} 
                        h={"95%"}
                        justifyContent="center" 
                        alignItems="center"
                    >
                        {nextCue ?  
                        <CueComponent 
                            view="next" 
                            cue={nextCue} 
                            borderWidth='2px'
                            borderRadius='lg'
                            borderColor="blue.500" 
                        /> : <Heading size={"md"}>N/A</Heading>}
                    </Flex>
                </Flex>

            </Flex>
        </Box>
    );
}
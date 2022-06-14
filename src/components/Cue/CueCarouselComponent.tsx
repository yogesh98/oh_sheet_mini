// import {useState} from 'react';
import { Box, Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
import CueComponent from "components/Cue/CueComponent";
import {
    ICue,
} from "types/types";

export interface ICueCarouselComponentProps {
    className?: string;
    cues: ICue[];
    currentPtr: number;
    flex?: number;
}

export function CueCarouselComponent (props: ICueCarouselComponentProps) {
    // return null;
    const currentCue = props.cues[props.currentPtr];
    const prevCue = props.currentPtr > 0 ?  props.cues[props.currentPtr - 1] : null;
    const nextCue = props.currentPtr < props.cues.length ? props.cues[props.currentPtr + 1] : null;
    return (
        <Box id={"cue_carousel"} flex={props.flex} overflow={"auto"} h={"100%"} className={props.className}>
            <Grid
            h='100%'
            templateColumns='repeat(9, 1fr)'
            templateRows='repeat(15, 1fr)'
            gap={4}
            >
                <GridItem  
                    colSpan={3} 
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="red.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Heading size={"md"}>Previous</Heading>
                </GridItem>
                <GridItem  
                    colSpan={3} 
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="green.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Heading size={"md"}>Current</Heading>
                </GridItem>
                <GridItem  
                    colSpan={3} 
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="blue.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Heading size={"md"}>Next</Heading>
                </GridItem>
                <GridItem  
                    colSpan={3} 
                    rowSpan={14}
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="red.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {prevCue ?  <CueComponent cue={prevCue} /> : <Heading size={"md"}>N/A</Heading>}
                </GridItem>
                <GridItem  
                    colSpan={3} 
                    rowSpan={14}
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="green.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {currentCue ?  <CueComponent cue={currentCue} /> : <Heading size={"md"}>N/A</Heading>}
                </GridItem>
                <GridItem  
                    colSpan={3} 
                    rowSpan={14}
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="blue.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {nextCue ?  <CueComponent cue={nextCue} /> : <Heading size={"md"}>N/A</Heading>}
                </GridItem>
            </Grid>
        </Box>
    );
}

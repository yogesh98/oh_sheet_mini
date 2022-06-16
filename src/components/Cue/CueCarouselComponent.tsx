import { Box, Grid, GridItem, Heading, useBreakpointValue } from "@chakra-ui/react";
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
    const currentCue = props.cues[props.currentPtr];
    const prevCue = props.currentPtr > 0 ?  props.cues[props.currentPtr - 1] : null;
    const nextCue = props.currentPtr < props.cues.length ? props.cues[props.currentPtr + 1] : null;
    const renderPrevious = useBreakpointValue({ lg: true, md: false, sm: false, xs: false, xxs: false, base: false });
    const templateColumns = useBreakpointValue({ lg: 6, md: 4, sm: 4, xs: 4, xxs: 4, base: 4 });
    return (
        <Box id={"cue_carousel"} flex={props.flex} h={"100%"} className={props.className}>
            <Grid
            h='100%'
            templateColumns={`repeat(${templateColumns}, 1fr)`}
            templateRows='repeat(15, 1fr)'
            gap={useBreakpointValue({ lg: 3, md: 2, sm: 1, xs: 0, xxs: 0 })}
            >
                {renderPrevious ? <GridItem  
                    colSpan={2} 
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="red.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Heading size={"md"}>Previous</Heading>
                </GridItem> : null}
                <GridItem  
                    colSpan={2} 
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
                    colSpan={2} 
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="blue.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Heading size={"md"}>Next</Heading>
                </GridItem>
                {renderPrevious ? <GridItem  
                    colSpan={2} 
                    rowSpan={14}
                    borderWidth='2px'
                    borderRadius='lg'
                    borderColor="red.500" 
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {prevCue ?  <CueComponent cue={prevCue} /> : <Heading size={"md"}>N/A</Heading>}
                </GridItem> : null}
                <GridItem  
                    colSpan={2} 
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
                    colSpan={2} 
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
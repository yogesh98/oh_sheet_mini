import {
    ICue,
} from "types/types";
import { Box, Flex, Text,  useColorModeValue,} from '@chakra-ui/react';
import { WidthProvider, Responsive } from "react-grid-layout";
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { setLayouts } from 'store/cueLayoutsSlice';

import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface ICueComponentProps {
    view: string;
    cue: ICue;
}

function CueDraggablePiece(props: {title: string, description: string}) {
    return (
        <Flex
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            borderWidth={useColorModeValue('2px', '')}
            borderRadius="lg"
            boxShadow={useColorModeValue('lg', 'dark-lg')}
            direction={'column'}
        >
            <Text fontSize={{ base: '14px', md: '20px', lg: '112x' }}>{props.description}</Text>
            <Text fontSize={{ base: '10px', md: '15px', lg: '100x' }}>{props.title}</Text>
        </Flex>
    );
}

export default function CueComponent (props: ICueComponentProps) {
    const layouts = useAppSelector(state => state.cueLayouts.layouts);
    const dispatch = useAppDispatch();

    return (
        <Box id="responsive-grid-bounding-box" h="100%" w="100%" >
            <ResponsiveReactGridLayout
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                layouts={layouts}
                onLayoutChange={(layout, layouts) =>
                    dispatch(setLayouts(layouts))
                }
            >
                {Object.keys(props.cue).map((cueTitle, index) => {
                    return (
                        <Box key={index}>
                            <CueDraggablePiece title={cueTitle} description={props.cue[cueTitle]} />
                        </Box>
                    );
                })}
            </ResponsiveReactGridLayout>
        </Box>
    );
}

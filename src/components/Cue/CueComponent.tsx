import {
    ICue,
} from "types/types";
import { Box, Button, Flex, Heading, Text,  useColorModeValue} from '@chakra-ui/react';
import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface ICueComponentProps {
    cue: ICue;
    layouts: any;
    onLayoutChange: (layouts: any) => void;
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
            boxShadow={{ base: 'none', sm: useColorModeValue('lg', 'dark-lg') }}
            direction={'column'}
        >
            <Heading size="md">{props.description}</Heading>
            <Text>{props.title}</Text>
        </Flex>
    );
}

export default function CueComponent (props: ICueComponentProps) {

    const resetLayout = () => {
        props.onLayoutChange({});
    }

    return (
        <Box h="100%" w="100%">
            <Button onClick={resetLayout}>Reset Layout</Button>
            <ResponsiveReactGridLayout
                className="layout"
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={50}
                layouts={props.layouts}
                onLayoutChange={(layout, layouts) =>
                    props.onLayoutChange(layouts)
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

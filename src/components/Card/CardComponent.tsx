import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

export interface ICardComponentProps {
    title?: string;
    titleButtons?: JSX.Element;
    description?: string;
    children?: JSX.Element | JSX.Element[] | never[] | null;
    onClick?: () => void;
}

export default function CardComponent (props: ICardComponentProps) {

    const boxShadow = useColorModeValue('lg', 'dark-lg');

    return (
        <Box
        p={4} 
        my={2}
        borderWidth='2px'
        borderRadius='lg'
        boxShadow={boxShadow}
        onClick={props.onClick}
        >
            <Flex justifyContent="space-between">
                {props.title ? <Heading as="h3" size="md">{props.title}</Heading> : null}
                {props.titleButtons ? props.titleButtons : null}
            </Flex>
            {props.children ? props.children : null}
        </Box>
    );
}

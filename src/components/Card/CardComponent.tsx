import { Box, Button, Collapse, Flex, Heading, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsChevronDown, BsChevronUp, BsTrash } from "react-icons/bs";

export interface ICardComponentProps {
    title?: string;
    isOpen?: boolean;
    description?: string;
    children?: JSX.Element | JSX.Element[] | never[] | null;
    onDelete?: () => void;
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
        >
            <Flex mb={2} alignItems="center" justifyContent="space-between">
                {props.title ? <Heading as="h3" size="md" cursor={"pointer"} onClick={props.onClick}>{props.title}</Heading> : null}
                <HStack >
                    {props.isOpen ? <BsChevronUp cursor={"pointer"} onClick={props.onClick} /> : <BsChevronDown cursor={"pointer"} onClick={props.onClick} /> }
                    {props.onDelete ? <Button onClick={props.onDelete} variant="Danger"><Icon as={BsTrash} /></Button> : null}
                </HStack>
            </Flex>
            {props.description ? <Heading as="h4" size="sm">{props.description}</Heading> : null}
            <Collapse in={props.isOpen} animateOpacity>
                {props.children ? props.children : null}
            </Collapse>
        </Box>
    );
}

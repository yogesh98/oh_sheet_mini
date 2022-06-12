// import {useState} from 'react';
import {
    ICue,
} from "types/types";

export interface ICueCarouselComponentProps {
    className?: string;
    cues: ICue[];
    currentPtr: number;
}

export function CueCarouselComponent (props: ICueCarouselComponentProps) {
    // const [currentCue , setCurrentCue] = useState(props.cues[props.currentPtr]);

    return (
        <div className={props.className}>
            test
        </div>
    );
}

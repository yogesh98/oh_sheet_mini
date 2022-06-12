import * as React from 'react';
import {
    ICue,
} from "types/types";

export interface ICueCarouselComponentProps {
    className?: string;
    cues: ICue[];
    currentPtr: number;
}

export function CueCarouselComponent (props: ICueCarouselComponentProps) {
  return (
    <div className={props.className}>
        test
    </div>
  );
}

export interface ICue {
    [x: string | number | symbol]: string;
}

export function isCue(obj: any): obj is ICue {
    return typeof obj === 'object' && obj !== null;
}

export interface ICueData {
    header: string;
    title: string;
    subtitle: string;
    cues: ICue[];
    currentPtr: number;
    standBy: boolean;
}

export function isCueData(obj: any): obj is ICueData {
    return typeof obj === 'object' && obj !== null;
}

export interface ICueLayoutItem {
    cueKey: string;
    order: number;
    colSpan: number;
    rowSpan: number;
}

export interface IVoiceChannel {
    name: string;
    mute: boolean;
}
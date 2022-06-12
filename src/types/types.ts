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
}

export function isCueData(obj: any): obj is ICueData {
    return typeof obj === 'object' && obj !== null;
}
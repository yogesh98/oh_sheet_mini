import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Layouts } from 'react-grid-layout';
import type { RootState } from './store';

interface LayoutState {
    layouts: Layouts
}

const initialState: LayoutState = {
    layouts: {},
}

export const cueLayoutsSlice = createSlice({
    name: 'cueLayouts',
    initialState,
    reducers: {
        setLayouts: (state, action: PayloadAction<Layouts>) => {
            state.layouts = action.payload;
        }
    }
});

export const { setLayouts } = cueLayoutsSlice.actions;

export const selectLayouts = (state: RootState) => state.cueLayouts;

export default cueLayoutsSlice.reducer;
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NoteState } from '../noteState/notes.state';



export const selectNotesState = createFeatureSelector<NoteState>('appState');


export const selectTempNote = createSelector(
  selectNotesState,
    (state: NoteState) => state.noteTemp
);

export const selectTitleTemp = createSelector(
  selectNotesState,
  (state:NoteState) => state.noteTemp
);

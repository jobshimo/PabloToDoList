import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NoteState } from '../noteState/notes.state';



export const selectNotesState = createFeatureSelector<NoteState>('noteState');


export const selectTempNote = createSelector(
  selectNotesState,
  (state: NoteState ) => state.noteTemp
);

export const selectNotes = createSelector(
  selectNotesState,
  ( state: NoteState ) => state.notes
);

export const selectSearch = createSelector(
  selectNotesState,
  ( state: NoteState ) => state.search
);


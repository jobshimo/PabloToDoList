import { NotesModel } from '../../models/notes.models';


export interface NoteState {

    noteTemp : NotesModel | null,
    loading  : boolean,
    error    : any,
    notes    : NotesModel[],
};

export const initialState: NoteState = {
    noteTemp  : null,
    loading   : false,
    notes     : [],
    error     : null
};

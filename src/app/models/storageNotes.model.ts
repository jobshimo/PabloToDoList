import { NotesModel } from './notes.models';


export interface StoregeNotesModel {
  notes: NotesModel[]
}

export class StorageNotes implements StoregeNotesModel {

  notes: NotesModel[] = []
  constructor(){}
}

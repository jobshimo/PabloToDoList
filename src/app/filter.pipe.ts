import { Pipe, PipeTransform } from '@angular/core';
import { NotesModel } from './models/notes.models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( notes: NotesModel[], texto: string): NotesModel[] {
    if( !texto ) return notes;
    return notes.filter( note => note.text.toUpperCase().includes( texto.toUpperCase() ));
  };

};

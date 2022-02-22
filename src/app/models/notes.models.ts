

export interface NotesModel {

  title     : string,
  text      : string,
  id        : string,
  dateCreate: Date,
  dateFinish: string,
  folder    : string [],
  owner     : string
};

export class Notes implements NotesModel{

  constructor(
    public title: string, public text: string, public id: string, public dateCreate: Date, public dateFinish: string, public folder:string[], public owner: string
  ){}
};



export interface UserModels {

    id     : string,
    email  : string,
    regDate: string,
    name   : string
};

export class User implements UserModels{

    constructor( public id: string, public email: string, public regDate: string, public name: string){}
};
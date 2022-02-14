

export interface CredentialsModels {

    email   : string,
    password: string
};

export class Credentials implements CredentialsModels{

    constructor( public email: string, public password: string){}
};
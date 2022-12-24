export interface StaticPage{
    id:number;
    pageName:string;
    details:string;
}


export interface UpdateStaticPageInput{
    in:number;
    details:string;
}
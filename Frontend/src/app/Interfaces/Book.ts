export class Book {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  about: string;
  publishYear: number;
  pageCount: number;
  authorId:number;
  authorName: string;
  publisherId:number;
  publisherName: string;
  translatorId:number;
  translatorName?: string;
  categoryId:number;
  categoryName: string;
}

export  class CreateBookInput{
  name: string;
  price: number;
  discount: number;
  image: string;
  about: string;
  publishYear: number;
  pageCount: number;
  authorId:number;
  publisherId:number;
  translatorId:number;
  categoryId:number;
}

export  class UpdateBookInput{
  id:number
  name: string;
  price: number;
  discount: number;
  image: string;
  about: string;
  publishYear: number;
  pageCount: number;
  authorId:number;
  publisherId:number;
  translatorId:number;
  categoryId:number;
}


export class BuyBookInput {
  bookId: number;
  amount: number;
  totalPrice: number;
}

export class ShowSalesForUserDto {
  amount: number;
  bookId: number;
  bookImage: string;
  bookName: string;
  bookPrice: number;
  id: number;
  orderDate: Date;
  totalPrice: number;
}

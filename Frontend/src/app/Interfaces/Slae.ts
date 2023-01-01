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
  saleStatus: number;
}

export class ShowSalesForAdminDto {
  id: number;
  amount: number;
  orderDate: Date;
  totalPrice: number;
  userId: string;
  userName: string;
  bookId: number;
  bookName: string;
  bookImage: string;
  bookPrice: number;
  saleStatus: number;
  soldDate: Date;
}

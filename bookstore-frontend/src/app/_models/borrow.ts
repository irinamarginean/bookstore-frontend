import { Book } from "./book";

export interface Borrow {
    id: string;
    book: Book;
    borrowDate: Date;
    returnDate: Date;
}
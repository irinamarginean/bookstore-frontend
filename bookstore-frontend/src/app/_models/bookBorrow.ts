import { Book } from "./book";

export interface BookBorrow {
    book: Book;
    wasBorrowed: boolean;
    borrowDate?: Date;
    returnDate?: Date;
}
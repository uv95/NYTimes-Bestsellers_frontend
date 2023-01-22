export interface IBookDetails {
  cover: string;
  author: string;
  title: string;
  description?: string;
  genre?: string | string[];
}

export interface IBooksState {
  currentBestseller: IBookDetails | null;
  currentBestsellersList: IBookDetails[] | [];
  date: string | null;
  isLoading: boolean;
}

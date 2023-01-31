export interface IBookDetails {
  cover: string;
  author: string;
  title: string;
  description?: string;
  isBookmarked?: boolean;
  isFinished?: boolean;
  _id?: string;
}

export interface IBestsellersState {
  currentBestseller: IBookDetails | null;
  currentBestsellersList: IBookDetails[] | [];
  date: string | null;
  isDateChanged: boolean;
  isLoading: boolean;
}

export interface IMarkedBooksState {
  markedBooks: IBookDetails[] | [];
  markedBook: IBookDetails | null;
  isLoading: boolean;
  isNewBookMarked: boolean;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdatedAuth {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IUserState {
  user: {
    _id?: string;
    email: string;
    name: string;
  } | null;
  isLoading: boolean;
}

export interface IBookDetails {
  cover: string;
  author: string;
  title: string;
  description?: string;
}

export interface IBestsellersState {
  currentBestseller: IBookDetails | null;
  currentBestsellersList: IBookDetails[] | [];
  date: string | null;
  dateIsChanged: boolean;
  isLoading: boolean;
}

export interface IMarkedBooksState {
  markedBooks: IMarkedBook[] | [];
  markedBook: IMarkedBook | null;
  isLoading: boolean;
}

export interface IMarkedBook {
  cover: string;
  author: string;
  title: string;
  isBookmarked: boolean;
  isFinished: boolean;
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

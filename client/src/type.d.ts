interface IUser {
  id: number;
  user_name: string;
  email: string;
  register_date: string;
}

type AuthState = {
  user: IUser | null;
  token: string | null;
  isAuthed: boolean;
  msg: string;
};

type AuthAction = {
  type: string;
  user?: IUser;
  token?: string;
};

type config = {
  headers: {
    "Content-type": string;
    "x-auth-token"?: string | undefined;
  };
};

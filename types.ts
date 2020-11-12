export interface INewBlog {
  title: string,
  content: string
}

export interface ILoginInfo {
  username: string,
  password: string
}

export interface IUser {
  id: number,
  username: string,
  name: string,
  password: string
}

export interface ILoginToken {
  token: string,
  username: string,
  name: string,
  id: number
}
export interface IBlogPost {
  id: number,
  title: string,
  content: string,
  created_at: string,
  modified_at: string,
  user_id: number
}

export interface INewBlogPost {
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

export interface IObjectContainingLoginField {
  login: unknown
}
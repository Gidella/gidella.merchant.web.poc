export interface LoginModel {
    email:    string;
    password: string;
}

export interface CreateAccountModel {
    firstName:  string;
    lastName:   string;
    email:      string;
    password:   string;
    phone:      string;
}

export interface CreatePasswordModel {
    token:           number;
    password:        string;
    confirmPassword: string;
}

export interface PaginatedModel<T> {
    itemList:    T[];
    currentPage: number;
    totalPages:  number;
    pageSize:    number;
    totalCount:  number;
    summary:     string;
    hasPrevious: boolean;
    hasNext:     boolean;
}

export interface ResponseModel<T> {
    message: string;
    status:  boolean;
    data:    T;
}

export interface APIResponseModel {
    status: boolean;
    data: any;
}

export interface UserModel {
    isMerchantOnboarded: boolean;
    businessURL: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    role: number;
  }
  
  export interface SessionModel {
    user: UserModel;
    token: string;
    expires: string;
  }
  
  export interface TokenModel {
    accessToken: string;
    tokenExp: number;
  }
  
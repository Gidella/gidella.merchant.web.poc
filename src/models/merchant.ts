export interface CreateMerchantModel {
    businessURL:     string;
    businessName:    string;
    longitude:       number;
    latitude:        number;
    phone:           string;
    gisAddress:      string;
    categoryId:      string;
}

export interface MerchantModel {
    businessName:       string;
    businessUrl:        string;
    location:           string;
    logoImageURL:       string;
    bannerImageURL:     string;
    merchantCategory:   string;
    merchantCategoryId: string;
    merchantId:         string;
}

export interface AdminCreateMerchantModel {
    businessURL:  string;
    businessName: string;
    longitude:    number;
    latitude:     number;
    phone:        string;
    gisAddress:   string;
    categoryId:   string;
    firstName:    string;
    lastName:     string;
    email:        string;
}

export interface CountryModel {
    id:       string;
    code:     string;
    name:     string;
    dialCode: string;
}

export interface CategoryModel {
    id:   string;
    name: string;
}
import { ProductModel, ProductVariationModel } from "./product";

export interface CreateMerchantModel {
    businessURL:     string;
    businessName:    string;
    longitude:       number;
    latitude:        number;
    phone:           string;
    gisAddress:      string;
    categoryId:      string;
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

export interface MerchantModel {
    businessName:       string;
    businessUrl:        string;
    logoImageURL:       null;
    bannerImageURL:     null;
    category:           string;
    merchantId:         string;
    phone:              null;
    categories:         CategoryModel[];
    brands:             any[];
    products:           ProductModel[];
    productVariations:  ProductVariationModel[];
}

export interface CategoryModel {
    categoryId:   string;
    name:         string;
    productCount: number;
}
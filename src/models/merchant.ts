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
    businessName:   string;
    businessUrl:    string;
    logoImageURL:   null;
    bannerImageURL: null;
    category:       string;
    merchantId:     string;
    phone:          null;
    categories:     CategoryModel[];
    brands:         any[];
    products:       ProductModel[];
}

export interface CategoryModel {
    categoryId:   string;
    name:         string;
    productCount: number;
}

export interface ProductModel {
    productId:           string;
    name:                string;
    amount:              number;
    description:         string;
    mediaURLs:           string[];
    isPublished:         boolean;
    productCategoryId:   string;
    productCategoryName: string;
    productBrandId:      null;
    productBrandName:    string;
    productBrandLogoURL: string;
    status:              number;
    statusName:          string;
}
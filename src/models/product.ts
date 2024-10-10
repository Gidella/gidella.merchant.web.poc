export interface CreateProductModel {
    name:              string;
    description:       string;
    amount:            number;
    imageUrl:          string;
    productCategoryId: string;
    productBrandId:    string | null;
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

export interface ProductVariationModel {
    variationId:    string;
    productId:      string;
    attributeName:  string;
    attributeValue: string;
    adjustedPrice:  number;
    variationType:  number;
}

export interface CartModel {
    products:   CartProductModel[];
    merchantId: string;
}

export interface CartProductModel {
    productId:      string;
    variationId:    string;
    variationName:  string;
    productName:    string;
    quantity:       number;
    amount:         number;
    imageUrl:       string;
}

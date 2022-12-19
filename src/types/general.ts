export interface IMetafieldsString {
  key: string;
  value: string;
}

export interface IProductNode {
  node: {
    id: string;
    title: string;
    onlineStoreUrl: string;
    featuredImage: IBasicImage;
    availableForSale: boolean;
    metafields: Array<IMetafieldsString | null>;
    priceRange: { maxVariantPrice: { amount: string } };
    variants: { edges: IProductVariantNode[] };
  };
}

export interface IBasicImage {
  altText: string | null;
  url: string | null;
  height: number | null;
  width: number | null;
}

export interface IProductVariantNode {
  node: {
    title: string;
    availableForSale: boolean;
    selectedOptions: IVariantOptions[];
    quantityAvailable: number;
    compareAtPriceV2: {
      amount: string;
      currencyCode: string;
    } | null;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    image: IBasicImage;
  };
}

export interface IVariantOptions {
  name: string;
  value: string;
}

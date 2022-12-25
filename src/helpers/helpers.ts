import {
  IProductNode,
  //   IProductVariantNode,
  IMetafieldsString,
} from "../types/general";

export const findMetafield = (
  metafields: Array<IMetafieldsString | null>,
  metaKey: string
) => metafields.find(meta => meta?.key === metaKey);

export const convertColourStringToArray = (colourValue: string | undefined) => {
  return colourValue
    ? colourValue.replace("[", "").replace("]", "").replace(/"/g, "").split(",")
    : [];
};

export const generateArrayOfValues = (
  products: IProductNode[],
  keyName: string
): string[] => {
  const arr1: Array<string | undefined> = [];
  products.forEach(product => {
    const metafields = findMetafield(product.node.metafields, keyName);
    if (keyName === "filter-colour") {
      const variants = product.node.variants.edges;
      const colorValues =
        metafields && convertColourStringToArray(metafields?.value);

      colorValues?.forEach(
        val =>
          variants.some(
            variant =>
              variant.node.availableForSale &&
              variant.node.selectedOptions.some(
                opt => getFilterFromTitle(opt.value) === val.toLowerCase()
              )
          ) && arr1.push(val)
      );
    } else {
      arr1.push(metafields?.value);
    }
  });
  // remove the duplicates
  const uniques = Array.from(new Set(arr1));
  return uniques.filter(el => el !== undefined) as string[];
};

// sort products by price
export const sortByPrice = (data: IProductNode[], asc: boolean) => {
  return [...data].sort((a, b) => {
    const numberA = parseFloat(a.node.priceRange.maxVariantPrice.amount);
    const numberB = parseFloat(b.node.priceRange.maxVariantPrice.amount);

    if (numberA < numberB) {
      return asc ? -1 : 1;
    }
    if (numberA > numberB) {
      return asc ? 1 : -1;
    }
    return 0;
  });
};

// sort products by metafield value
export const sortByMetafield = (
  data: IProductNode[],
  metaFieldKey: string,
  asc: boolean
) => {
  return [...data].sort((a, b) => {
    const metafieldA = findMetafield(a.node.metafields, metaFieldKey);
    const metafieldB = findMetafield(b.node.metafields, metaFieldKey);
    const numberA = metafieldA && +metafieldA?.value;
    const numberB = metafieldB && +metafieldB?.value;
    if (numberA && numberB) {
      if (numberA < numberB) {
        return asc ? -1 : 1;
      }
      if (numberA > numberB) {
        return asc ? 1 : -1;
      }
    }
    return 0;
  });
};

export const getFilterFromTitle = (colour: string) => {
  switch (colour.toLowerCase()) {
    case "black":
    case "blue":
    case "green":
    case "grey":
    case "orange":
    case "pink":
    case "purple":
    case "red":
    case "white":
    case "yellow":
      return colour.toLowerCase();

    case "rose":
      return "pink";

    case "teal":
    case "mint":
    case "neon green":
    case "dark teal":
    case "ocean green":
    case "lime":
    case "Midnight green":
    case "metallic soda green":
      return "green";

    case "dark grey":
    case "charcoal":
    case "silver":
    case "bare metal":
      return "grey";

    case "aqua":
    case "neon blue":
    case "navy":
    case "pale blue":
    case "dark indigo":
    case "galactic purple":
      return "blue";

    case "neon red":
      return "red";

    case "cream":
      return "white";

    case "tour de france":
      return "yellow";

    case "red & blue":
      return "red/blue";

    case "yellow & green":
      return "yellow/green";

    case "vivid purple":
    case "lilac":
    case "dark violet":
    case "ultra violet":
      return "purple";

    case "silver/berry":
      return "grey/purple";

    case "silver/blue":
      return "grey/blue";

    case "silver/orange":
      return "grey/orange";

    case "white/purple":
      return "white/purple";

    case "white/blue":
      return "white/blue";

    case "team sky":
    case "union jack":
    case "spotty":
    case "scootersaurus":
    case "dino":
    case "flamingo":
    case "rocket":
    case "unicorn":
    case "monster":
    case "cars":
    case "star wars":
    case "frozen":
    case "ant":
    case "bunny":
    case "croco":
    case "dots":
    case "elephant":
    case "sealife":
      return "printed";
  }
};

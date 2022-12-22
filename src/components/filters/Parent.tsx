import { useReducer, useEffect } from "react";
import { products } from "../../data/data";
import Child from "./Child";
import { IProductNode, IMetafieldsString } from "../../types/general";

const initialState = {
  checkedColors: [],
  checkedBrands: [],
  checkedWheels: [],
  checkedSizes: [],
  checkedCondition: [],
  selectedInnerLeg: [],
  selectedAge: [],
  selectedHeight: [],
  sortingVal: "",
  numOfFilters: 0,
  currentProducts: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INITIAL_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "COUNT_FILTERS":
      return {
        ...state,
        numOfFilters: action.payload,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        checkedColors: [],
        checkedBrands: [],
        checkedWheels: [],
        checkedSizes: [],
        checkedCondition: [],
        selectedInnerLeg: [],
        selectedAge: [],
        selectedHeight: [],
        sortingVal: "",
        numOfFilters: 0,
        currentProducts: [],
      };
    case "SORT_FILTER":
      return {
        ...state,
        currentProducts: [...action.payload],
      };
    // case "SORT":
    //   return {
    //     ...state,

    //   }
    default:
      return state;
  }
};

const Parent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let isSubscription = true;
  let isAdult = true;

  const sortingOptions = isSubscription
    ? [
        "Price Low to High",
        "Price High to Low",
        "Inner Leg Low to High",
        "Inner Leg High to Low",
        "Bike Weight Low to High",
        "Bike Weight High to Low",
      ]
    : ["Price Low to High", "Price High to Low"];

  const productsAvailable = products.filter(elem => elem.node.availableForSale);

  let filterCount = 0;

  useEffect(() => {
    dispatch({
      type: "INITIAL_DATA",
      payload: {
        sortingVal: sortingOptions,
        currentProducts: [...productsAvailable],
        numOfFilters: filterCount,
      },
    });
  }, []);

  // filter by sort options function?

  const sortCurrentProducts = (sortingVal: string) => {
    switch (sortingVal) {
      case "Price Low to High":
        filtered = sortByPrice(filtered, true);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;

      case "Price High to Low":
        filtered = sortByPrice(filtered, false);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;

      case "Inner Leg Low to High":
        filtered = sortByMetafield(filtered, "leg-min", true);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;

      case "Inner Leg High to Low":
        filtered = sortByMetafield(filtered, "leg-min", false);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;

      case "Bike Weight Low to High":
        filtered = sortByMetafield(filtered, "weight", true);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;

      case "Bike Weight High to Low":
        filtered = sortByMetafield(filtered, "weight", false);
        dispatch({ type: "SORT_FILTER", payload: filtered });
        break;
    }
  };

  const sortByPrice = (data: IProductNode[], asc: boolean) => {
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

  // SORTING FUNCTIONS for inner leg & bike weight - can be used for any metafield
  const sortByMetafield = (
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

  const findMetafield = (
    metafields: Array<IMetafieldsString | null>,
    metaKey: string
  ) => metafields.find(meta => meta?.key === metaKey);

  let filtered = [...state.currentProducts];

  return (
    <div>
      <div>{state.numOfFilters}</div>
      {/* <Child state={state} dispatch={dispatch} /> */}
      <select onChange={e => sortCurrentProducts(e.target.value)}>
        {sortingOptions.map(option => (
          <option value={option}>{option}</option>
        ))}
      </select>
      <ul>
        {state.currentProducts.map((product: any) => (
          <>
            <li>
              {product.node.title} |{" "}
              {product.node.priceRange.maxVariantPrice.amount}
            </li>
            <br />
          </>
        ))}
      </ul>
    </div>
  );
};

export default Parent;

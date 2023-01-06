import { useReducer, useEffect } from "react";
import { products } from "../data/data";
import { IProductNode, IFilterCheckboxDropdown } from "../types/general";
import {
  findMetafield,
  sortByPrice,
  sortByMetafield,
  convertColourStringToArray,
  getFilterFromTitle,
  generateArrayOfValues,
} from "../helpers/helpers";

import ProductCard from "./ProductCard";
import FiltersGrid from "./FiltersGrid";

import { Container, SimpleGrid } from "@chakra-ui/react";

const initialState = {
  currentProducts: [],
  checkedBrands: [],
  checkedColors: [],
  checkedCondition: [],
  checkedWheels: [],
  checkedSizes: [],
  selectedInnerLeg: [],
  selectedAge: [],
  selectedHeight: [],
  numOfFilters: 5,
  openAccordionIndex: -1,
  isClearedAll: false,
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
    case "SELECT_FILTER":
      return {
        ...state,
        [action.payload.name]: [
          ...state[action.payload.name],
          action.payload.value,
        ],
      };
    case "OPEN_ACCORDION":
      return {
        ...state,
        openAccordionIndex: action.payload,
      };
    case "SORT_FILTER":
      return {
        ...state,
        currentProducts: [...action.payload],
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        [action.payload]: [],
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        checkedBrands: [],
        checkedColors: [],
        checkedCondition: [],
        checkedWheels: [],
        checkedSizes: [],
        selectedInnerLeg: [],
        selectedAge: [],
        selectedHeight: [],
      };
    default:
      return state;
  }
};

const CollectionGrid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let isSubscription = true;
  let isAdult = false;

  const productsAvailable = products.filter(elem => elem.node.availableForSale);

  useEffect(() => {
    dispatch({
      type: "INITIAL_DATA",
      payload: {
        currentProducts: [...productsAvailable],
      },
    });
  }, []);

  const renderProductCards = state.currentProducts.map((product: any) => {
    const {
      title,
      featuredImage: { url },
      priceRange: {
        maxVariantPrice: { amount },
      },
    } = product.node;

    return <ProductCard title={title} price={amount} image={url} />;
  });

  return (
    <Container maxW="900px" margin="0 auto">
      <FiltersGrid
        state={state}
        dispatch={dispatch}
        isSubscription={isSubscription}
        isAdult={isAdult}
      />

      <SimpleGrid columns={3} spacing={24} pt="100px">
        {renderProductCards}
      </SimpleGrid>
    </Container>
  );
};

export default CollectionGrid;

import { useReducer, useEffect } from "react";
import { products } from "../data/data";
import { IProductNode } from "../types/general";
import {
  findMetafield,
  sortByPrice,
  sortByMetafield,
  convertColourStringToArray,
  getFilterFromTitle,
  generateArrayOfValues,
} from "../helpers/helpers";

import ProductCard from "./ProductCard";
import Filters from "./Filters";

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

const initialState = {
  checkedColors: [],
  checkedBrands: [],
  checkedWheels: [],
  checkedSizes: [],
  checkedCondition: [],
  selectedInnerLeg: [],
  selectedAge: [],
  selectedHeight: [],
  numOfFilters: 0,
  penAccordionIndex: -1,
  isClearedAll: false,
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
    case "INCREMENT_COUNT":
      return {
        ...state,
        numOfFilters: state.numOfFilters++,
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
    default:
      return state;
  }
};

const CollectionGrid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let isSubscription = true;
  let isAdult = true;

  const productsAvailable = products.filter(elem => elem.node.availableForSale);

  let filterCount = 0;

  useEffect(() => {
    dispatch({
      type: "INITIAL_DATA",
      payload: {
        currentProducts: [...productsAvailable],
        numOfFilters: filterCount,
      },
    });
  }, []);

  const brandArr = generateArrayOfValues(state.currentProducts, "brand").sort();
  const colorArr = generateArrayOfValues(
    state.currentProducts,
    "filter-colour"
  ).sort();
  const wheelSzArr = generateArrayOfValues(
    state.currentProducts,
    "wheel-size"
  ).sort();

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
      <Filters
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

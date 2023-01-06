import {
  IFilterInputDropdown,
  IFilterCheckboxDropdown,
} from "../types/general";

import {
  sortByPrice,
  sortByMetafield,
  generateArrayOfValues,
} from "../helpers/helpers";

import {
  Accordion,
  Box,
  SimpleGrid,
  Text,
  Circle,
  HStack,
  Flex,
  Button,
} from "@chakra-ui/react";

import FilterDropdown from "./FilterDropdown";
import FilterFreeInput from "./FilterFreeInput";

type ChildProps = {
  state: any;
  dispatch: any;
  isSubscription: boolean;
  isAdult: boolean;
};

import { IProductNode } from "../types/general";

const Filters = ({ state, dispatch, isSubscription, isAdult }: ChildProps) => {
  const {
    checkedBrands,
    checkedColors,
    checkedWheels,
    numOfFilters,
    openAccordionIndex,
  } = state;

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

  // TODO: refactor this logic to be in the reducer itself
  const sortCurrentProducts = (sortingValue: string) => {
    let products = [...state.currentProducts];

    switch (sortingValue) {
      case "Price Low to High":
        products = sortByPrice(products, true);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;

      case "Price High to Low":
        products = sortByPrice(products, false);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;

      case "Inner Leg Low to High":
        products = sortByMetafield(products, "leg-min", true);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;

      case "Inner Leg High to Low":
        products = sortByMetafield(products, "leg-min", false);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;

      case "Bike Weight Low to High":
        products = sortByMetafield(products, "weight", true);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;

      case "Bike Weight High to Low":
        products = sortByMetafield(products, "weight", false);
        dispatch({ type: "SORT_FILTER", payload: products });
        break;
    }
  };

  const brandArr = generateArrayOfValues(state.currentProducts, "brand").sort();
  const colorArr = generateArrayOfValues(
    state.currentProducts,
    "filter-colour"
  ).sort();
  const wheelSzArr = generateArrayOfValues(
    state.currentProducts,
    "wheel-size"
  ).sort();
  let bikeConditionArr: Array<string> = [];
  const sizeSet = new Set();

  state.currentProducts.forEach((obj: IProductNode) => {
    const variantEdge = obj.node.variants.edges;
    variantEdge.forEach(obj2 => {
      const { selectedOptions, availableForSale } = obj2.node;
      // check if there are any "New" or "reBike" values
      const isNew = selectedOptions.some(
        option => option.value === "New" || option.value === "new"
      );
      const isRebike = selectedOptions.some(
        option => option.value === "reBike" || option.value === "Rebike"
      );
      selectedOptions.forEach(option => {
        if (availableForSale && option.name === "Size") {
          sizeSet.add(option.value);
        }
      });
      if (availableForSale) {
        if (isNew) {
          bikeConditionArr.push("New");
        } else if (isRebike) {
          bikeConditionArr.push("reBike");
        }
      }
    });
  });

  bikeConditionArr = Array.from(new Set(bikeConditionArr));
  const sizeArr = Array.from(sizeSet) as string[];

  // ############## BUILD FILTERS ################ //

  // TODO: rename filterReset to selectedValues

  const buildFiltersArray = () => {
    const filtersArray: Array<IFilterCheckboxDropdown | IFilterInputDropdown> =
      [];
    if (brandArr.length > 1) {
      filtersArray.push({
        type: "dropdown",
        key: "brand",
        title: "Brand",
        // pass the checked item in to be used to know which checked state to reset
        resetValue: "checkedBrands",
        options: brandArr,
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "checkedBrands", value: event },
          });
        },
      });
    }

    if (colorArr.length > 1) {
      filtersArray.push({
        type: "dropdown",
        key: "colour",
        title: "Colour",
        resetValue: "checkedColors",
        options: colorArr,
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "checkedColors", value: event },
          });
        },
      } as IFilterCheckboxDropdown);
    }

    if (isSubscription && bikeConditionArr.length > 1) {
      filtersArray.push({
        type: "dropdown",
        key: "condition",
        title: "New / reBike",
        resetValue: "checkedCondition",
        options: bikeConditionArr,
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "checkedCondition", value: event },
          });
        },
      } as IFilterCheckboxDropdown);
    }

    if (isSubscription && wheelSzArr.length > 1) {
      filtersArray.push({
        type: "dropdown",
        key: "wheel",
        title: "Wheel size (inches)",
        resetValue: "checkedWheels",
        options: wheelSzArr,
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "checkedWheels", value: event },
          });
        },
      } as IFilterCheckboxDropdown);
    }

    if (!isSubscription && sizeArr.length > 1) {
      filtersArray.push({
        type: "dropdown",
        key: "size",
        title: "Size",
        resetValue: "checkedSizes",
        options: sizeArr,
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "checkedSizes", value: event },
          });
        },
      } as IFilterCheckboxDropdown);
    }

    if (isSubscription) {
      filtersArray.push({
        type: "input",
        key: "innerLeg",
        title: "Rider Inner Leg",
        resetValue: "selectedInnerLeg",
        unit: "cm",
        placeholder: "eg: 42",
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "selectedInnerLeg", value: event },
          });
        },
      } as IFilterInputDropdown);
    }

    if (isSubscription && !isAdult) {
      filtersArray.push({
        type: "input",
        key: "riderAge",
        title: "Rider Age",
        resetValue: "selectedAge",
        unit: "years",
        placeholder: "eg: 5",
        setter: (event: any) => {
          dispatch({
            type: "SELECTED_BRAND",
            payload: { name: "selectedAge", value: event },
          });
        },
      } as IFilterInputDropdown);

      console.log(filtersArray);
    }
    return filtersArray;
  };

  // console.log(brandArr);

  const renderFilters = buildFiltersArray().map((filter, index) => {
    if (filter.type === "dropdown") {
      return (
        <FilterDropdown
          key={`${filter.key}-filter`}
          filterTitle={filter.title}
          filterReset={filter.resetValue}
          filterOptions={[...filter.options]}
          stateSetter={filter.setter}
          state={state}
          dispatch={dispatch}
          thisAccIndex={index}
          openAccordionIndex={openAccordionIndex}
          // setOpenAccordionIndex={}
        />
      );
    }

    if (filter.type === "input") {
      return (
        <FilterFreeInput
          key={`${filter.key}-filter`}
          filterTitle={filter.title}
          filterReset={filter.resetValue}
          unit={filter.unit}
          placeholder={filter.placeholder}
          stateSetter={filter.setter}
          thisAccIndex={index}
          openAccordionIndex={openAccordionIndex}
          // setOpenAccordionIndex={setOpenAccordionIndex}
        />
      );
    }
  });

  return (
    <>
      <Flex
        justifyContent="space-between"
        paddingBottom={6}
        paddingTop={{ base: "initial", lg: "0px" }}
        px={4}
        w={{ base: "auto", lg: "fit-content" }}
      >
        <HStack display={{ base: "flex", lg: "none" }}>
          <Text textStyle="h3">Filters</Text>
          <Circle size={6} layerStyle="whiteOnPurple" px={2}>
            {numOfFilters}
          </Circle>
        </HStack>

        {numOfFilters > 0 && (
          <Button
            variant="collectionsButton"
            w={{ base: "28", lg: "36" }}
            zIndex={2}
            onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
            _hover={{
              layerStyle: "whiteOnPurple",
              boxShadow:
                "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            Clear All
          </Button>
        )}
      </Flex>

      {/* <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={1}
        display={{
          base: 'none',
          lg: openAccordionIndex > -1 ? 'block' : 'none',
        }}
        // onClick={() => {
        //   state(-1);
        // }}
      ></Box> */}
      <Accordion
        allowToggle
        color="bcDeepPurple.700"
        pos="relative"
        index={openAccordionIndex}
      >
        {/* <SimpleGrid
          columns={{ base: 1, lg: 2, xl: 3 }}
          spacing={{ base: 8, lg: 14 }}
          spacingY={{ base: 0, lg: 8 }}
          mb={18}
        > */}
          {renderFilters}
        {/* </SimpleGrid> */}
      </Accordion>

      <div>
        <select onChange={e => sortCurrentProducts(e.target.value)}>
          {sortingOptions.map(option => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;

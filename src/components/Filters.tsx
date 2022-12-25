import { sortByPrice, sortByMetafield } from "../helpers/helpers";

type ChildProps = {
  state: any;
  dispatch: any;
  isSubscription: boolean;
  isAdult: boolean;
};

const Filters = ({ state, dispatch, isSubscription, isAdult }: ChildProps) => {
  const { checkedBrands, checkedColors, checkedWheels } = state;

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

  const sortCurrentProducts = (sortingVal: string) => {
    let products = [...state.currentProducts];

    switch (sortingVal) {
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

  return (
    <div>
      <select onChange={e => sortCurrentProducts(e.target.value)}>
        {sortingOptions.map(option => (
          <option value={option}>{option}</option>
        ))}
      </select>
      <button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>Clear</button>
    </div>
  );
};

export default Filters;

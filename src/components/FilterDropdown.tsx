import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Button,
  Checkbox,
  Circle,
} from "@chakra-ui/react";

interface FilterDropdownProps {
  state: any;
  dispatch: React.Dispatch<any>;
  filterTitle: string;
  filterReset: string;
  filterOptions: string[];
  stateSetter: React.Dispatch<React.SetStateAction<string[]>>;
  thisAccIndex: number;
  openAccordionIndex: number;
  // setOpenAccordionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FilterDropdown = ({
  filterTitle,
  filterReset,
  filterOptions,
  state,
  dispatch,
  stateSetter,
  thisAccIndex,
  openAccordionIndex,
}: // setOpenAccordionIndex,
FilterDropdownProps) => {
  const isColourFilter = filterTitle === "Colour";
  const isWheelSizeFilter = filterTitle === "Wheel size (inches)";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SELECT_FILTER",
      payload: { name: filterReset, value: e },
    });
    e.target.checked
      ? dispatch({
          type: "SELECT_FILTER",
          payload: { name: filterReset, value: e },
        })
      : dispatch({
          type: "SELECT_FILTER",
          payload: {
            name: filterReset,
            value: state[filterReset].filter((o: any) => o !== e.target.value),
          },
        });
  };

  const handleReset = () => {
    dispatch({ type: "CLEAR_FILTER", payload: filterReset });
  };

  console.log(state[filterReset]);

  return (
    <>
      <div>{filterTitle}</div>
      <div>{filterReset}</div>
      <select name="hello" id="" onChange={e => handleChange(e.target.value)}>
        {filterOptions.map((op: any) => (
          <>
            <option value={op}>{op}</option>
            {/* <input type="checkbox" onChange={e => handleChange(e.target.value)} /> */}
          </>
        ))}
      </select>
      <button onClick={handleReset}>reset</button>
    </>
  );
};

export default FilterDropdown;

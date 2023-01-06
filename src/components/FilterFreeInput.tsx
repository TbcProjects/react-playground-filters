interface FilterFreeInputProps {
  unit: string;
  filterTitle: string;
  filterReset: string;
  placeholder: string;
  stateSetter: React.Dispatch<React.SetStateAction<string>>;
  thisAccIndex: number;
  openAccordionIndex: number;
  // setOpenAccordionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FilterFreeInput = ({
  filterTitle,
  filterReset,
  unit,
  placeholder,
  stateSetter,
  thisAccIndex,
  openAccordionIndex,
}: FilterFreeInputProps) => {
  return (
    <>
      <div>{filterTitle}</div>
      <div>{filterReset}</div>
    </>
  );
};

export default FilterFreeInput;

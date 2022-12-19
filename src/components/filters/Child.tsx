type ChildProps = {
  state: any;
  dispatch: any;
};

const Child = ({ state, dispatch }: ChildProps) => {
  const { checkedBrands, checkedColors, checkedWheels } = state;

  

  return (
    <div>
      <button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>Clear</button>
    </div>
  );
};

export default Child;

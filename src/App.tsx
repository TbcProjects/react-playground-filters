import Parent from "./components/filters/Parent";
import { useState, useMemo } from "react";

function SortedList({ list }: any) {
  const sortedList = useMemo(() => [...list].sort(), [list]);
  let key = 1;

  return (
    <div>
      {list.map((item: any) => {
        return <p key={key++}>{item}</p>;
      })}
    </div>
  );
}

function App() {
  const [numbers] = useState([10, 20, 30, 300, 120, 312]);

  const total = useMemo(
    () => numbers.reduce((acc, number) => acc * number, 50),
    [numbers]
  );

  const [unsortedList] = useState([2, 6, 1, 2, 5, 6]);

  return (
    <>
      <div className="container">
        {/* <p>Total: {total}</p> */}

        {/* <SortedList list={unsortedList} /> */}
        <p></p>
      </div>
      <Parent />
    </>
  );
}

export default App;

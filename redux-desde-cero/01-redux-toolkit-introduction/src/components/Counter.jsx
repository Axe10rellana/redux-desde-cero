//react-redux
import { useSelector, useDispatch } from "react-redux";

//react
import { useState } from "react";

//slices
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "../features/counter/counterSlice";

const Counter = () => {
  //redux state
  const count = useSelector((state) => state.counter.count);

  //dispatch
  const dispatch = useDispatch();

  //state variables
  const [incrementAmount, setIncrementAmount] = useState(0);

  //variables
  const addValue = Number(incrementAmount) || 0;

  //functions
  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add amount
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  );
};

export default Counter;

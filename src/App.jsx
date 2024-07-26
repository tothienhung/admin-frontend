// src/App.jsx

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './store/counterSlice';
import { Link } from 'react-router-dom';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

        </ul>
      </nav>
      <h1 className="font-bold text-8xl">Count: {count}</h1>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className="px-4 py-2 text-white bg-red-500 rounded"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        className="px-4 py-2 text-white bg-green-500 rounded"
        onClick={() => dispatch(incrementByAmount(2))}
      >
        Increment by 2
      </button>
    </div>
  );
}

export default App;

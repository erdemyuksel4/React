import { useState } from 'react';
function Counter(){
  const [value, setValue] = useState(0);
  function handleClick(){
    setValue(value + 1);
  }
  return <h1 className="counter" onClick={handleClick}>{value}</h1>
}
export default function Container(){
  return(
    <div>
      <Counter/>
    </div>
  );
}
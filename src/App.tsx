import React, { useReducer } from 'react';
import './App.css';
import { ReducerInput, State } from './Types';
import { Row } from './Row';


function reducer(state: State, action: ReducerInput): State{
  let result = {...state};
  if (action[0] === 'target'){
    result.target = action[1];
  }
  else if (action[0] === 'set'){
    result[action[1]] = action[2];
  }
  else {
    throw new Error('Unknown action: '+ action[0]);
  }

  if (result.target === 'w'){
    result.w = result.v * result.a;
  }
  else if (result.target === 'v'){
    result.v = result.w / result.a;
  }
  else if (result.target === 'a'){
    result.a = result.w / result.v;
  }
  else{
    throw new Error('Unknown target: ' + result.target);
  }
  return result;
}

function App() {

  const [state, updateState] = useReducer(reducer, {
    w:1,
    v:1,
    a:1,
    target:'w'
  });

  
  return (
    <div className="App">
      <header className="App-header">
        
      <table>
        <tbody>
          <Row name='Watts' varType='w' state={state} updateState={updateState} />
          <Row name='Volts' varType='v' state={state} updateState={updateState} />
          <Row name='Amps' varType='a' state={state} updateState={updateState} />
          
        </tbody>
      </table>
      </header>
    </div>
  );
}

export default App;

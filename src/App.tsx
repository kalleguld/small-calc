import React, { useReducer } from 'react';
import './App.css';
import { NumInput, Prop, Radio } from '@kalleguld/react-props';

type VarType = 'w'|'v'|'a';
interface State {
  w:number;
  v:number;
  a:number;
  target:VarType;
};
type ValSetter = ['set', VarType, number];
type TargetSetter = ['target', VarType];
type ReducerInput = ValSetter|TargetSetter;

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

  const choice: Prop<VarType> = {
    value: state.target,
    set: c => updateState(['target', c])
  };

  const val: ((vt: VarType) => Prop<number>) = (vt: VarType) => {
    return {
      value: state[vt],
      set: (n) => updateState(['set', vt, n])
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor='r-w'>Watts</label>
            </td>
            <td>
              <Radio id='r-w' value='w' prop={choice} />
            </td>
            <td>
              <NumInput prop={val('w')} disabled={state.target === 'w'} />
            </td>
          </tr>
          
          <tr>
            <td>
              <label htmlFor='r-v'>Volts</label>
            </td>
            <td>
              <Radio id='r-v' value='v' prop={choice} />
            </td>
            <td>
              <NumInput prop={val('v')} disabled={state.target === 'v'} />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor='r-a'>Amps</label>
            </td>
            <td>
              <Radio id='r-a' value='a' prop={choice} />
            </td>
            <td>
              <NumInput prop={val('a')} disabled={state.target === 'a'} />
            </td>
          </tr>
        </tbody>
      </table>
      </header>
    </div>
  );
}

export default App;

import { NumInput, Prop, Radio } from "@kalleguld/react-props";
import { ReducerInput, State, VarType } from "./Types";

export function Row(props: {
    state: State,
    updateState: (ri: ReducerInput) => void,
    varType: VarType,
    name: string,
}){
    const {
        state, 
        updateState,
        varType,
        name,
    } = props;

  const choice: Prop<VarType> = {
    value: state.target,
    set: c => updateState(['target', c])
  };
  const prop: Prop<number> = {
      value: state[varType],
      set: n => updateState(['set', varType, n])
  }
  const id = `r-${varType}`;
    return (    
        <tr>
            <td>
                <label htmlFor={id}>{name}</label>
            </td>
            <td>
                <Radio id={id} value={varType} prop={choice} />
            </td>
            <td>
                <NumInput prop={prop} disabled={state.target === varType} />
            </td>
        </tr>
    );
}
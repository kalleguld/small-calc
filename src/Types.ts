
export type VarType = 'w'|'v'|'a';
export interface State {
  w:number;
  v:number;
  a:number;
  target:VarType;
};
export type ValSetter = ['set', VarType, number];
export type TargetSetter = ['target', VarType];
export type ReducerInput = ValSetter|TargetSetter;
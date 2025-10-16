import VariablesAndConstants from "./VariablesAndConstants";
import TernaryOperator from "./TernaryOperator";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import IfElse from "./IfElse";
import VariableTypes from "./VariableTypes";
import TemplateLiterals from "./TemplateLiterals";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import House from "./House";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreader";
import Add from "./Add";
import Classes from "./Classes";
import Styles from "./Styles";
import Square from "./Square";
import Highlight from "./Highlight";

export default function Lab3() {
  console.log("Hello World!");
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>
      <TernaryOperator/>
      <IfElse/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>
      <TemplateLiterals/>
      <LegacyFunctions/>
      <ArrowFunctions/>
      <ImpliedReturn/>
      <FunctionDestructing/>
      <DestructingImports/>
      <SimpleArrays/>
      <ArrayIndexAndLength/>
      <AddingAndRemovingToFromArrays/>
      <Spreading/>
      <Destructing/>
      <ForLoops/>
      <FilterFunction/>
      <MapFunction/>
      <FindFunction/>
      <FindIndex/>
      <JsonStringify/>
      <House/>
      <Classes/>
      <Styles/>
      <Add a={3} b={4}></Add>
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
</Highlight>
    </div>
  );
}

import "./index.css";
import {TreeProvider, useTreeData} from "../useTree";
import { DrawTree } from "./DrawTree";

export default function Tree() {

  const {tree} = useTreeData();

  return (
    <TreeProvider>
      <div className="tree">
        <ol><DrawTree node={ tree }/></ol>
      </div>
    </TreeProvider>
  );
}

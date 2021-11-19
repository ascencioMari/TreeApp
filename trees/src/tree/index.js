import "./index.css";
import dataTree from "./data.json";
import { DrawTree } from "./DrawTree";

export default function Tree() {
  return (
    <div className="tree">
      <ol><DrawTree node={dataTree}/></ol>
    </div>
  );
}

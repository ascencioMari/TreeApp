import "./index.css";
import { TreeProvider } from "../useTree";
import { RemoteData } from "./RemoteData";

export default function Tree() {
  return (
    <TreeProvider>
      <RemoteData />
    </TreeProvider>
  );
}

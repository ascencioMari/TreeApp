import "./index.css";
import { useState, useEffect } from "react";
import { useTreeContext } from "../useTree";
import { DrawTree } from "./DrawTree";

export const RemoteData = () => {

  const [ loading, setLoading ] = useState(true);
  const tree = useTreeContext();

  useEffect(() => {
    fetch("https://api.jsonbin.io/b/6195429962ed886f915029fa/latest",{
      headers:{"secret-key":"$2b$10$99DByc7o1/gsQcWWUwNOre584yBgU7shpNL/fdzGzLrb4Hsc.WdM6"}
    })
    .then(response => response.json())
    .then(data => {
      tree.initialLoad(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className="tree">
            <ol><DrawTree node={ tree.tree }/></ol>
          </div>
        )
      }
    </>
  );
}

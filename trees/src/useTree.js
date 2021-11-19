import { useContext, createContext, useState } from "react";
import dataTree from "./tree/data.json";

export const TreeContext = createContext(); 


export const TreeProvider = ({ children }) => {
  const initialTree = useTreeData();

  return <TreeContext.Provider value={initialTree}>{children}</TreeContext.Provider>;
};

export const useTreeData = () => {
    
  const [tree, setTree] = useState(dataTree);
  
  const getNodeByDeep = (tree, depth) => {
    
    let node = tree;

    for(let i = 0; i < depth.length; i++){
        
      node = node.children[depth[i]];
    }

    return node;
  }

  const setNewNode = (newNode,depth) => {
   
    const newTree = {...tree};
    const node = getNodeByDeep(newTree,depth);
    
    if(node.children) node.children.push(newNode); 
    
    setTree(newTree);
  };

  const deleteNode = (nodeName, depth) => {
   
    const newTree = {...tree};
    depth.pop();
    const node = getNodeByDeep(newTree,depth);
    const siblindList = node.children;
    const index = siblindList.findIndex(element => element.node === nodeName );
    siblindList.splice(index, 1);
    
    setTree(newTree);
  };

  return { tree, setNewNode, deleteNode };
}

export const useTreeContext = () => {
    return useContext(TreeContext);
};
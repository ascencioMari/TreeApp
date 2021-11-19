import { useContext, createContext, useState } from "react";

export const TreeContext = createContext(); 


export const TreeProvider = ({ children }) => {
  const initialTree = useTreeData();

  return <TreeContext.Provider value={initialTree}>{children}</TreeContext.Provider>;
};

export const useTreeData = () => {
    
  const [tree, setTree] = useState({});

  const getNodeByDeep = (tree, depth) => {
    
    let node = tree;

    for(let i = 0; i < depth.length; i++){
        
      node = node.children[depth[i]];
    }

    return node;
  }

  const updateAPI = async (tree) => {
      
    let statusCode;

    await fetch("https://api.jsonbin.io/v3/b/6195429962ed886f915029fa",{
      headers:{
        "Content-Type": "application/json",
        "X-Master-key":"$2b$10$99DByc7o1/gsQcWWUwNOre584yBgU7shpNL/fdzGzLrb4Hsc.WdM6"
      },
      method: 'PUT',
      body: JSON.stringify(tree)
    })
    .then(response => {
      statusCode = response.status === 200 ? true : false;
      return response.json();
    }).then(data => {
      if(statusCode) setTree(data.record);
    });

    return statusCode;
  }

  const setNewNode = async (newNode,depth) => {
    
    const newTree = {...tree};
    const node = getNodeByDeep(newTree,depth);
    
    if(node.children) node.children.push(newNode);

    const statusCode = updateAPI(newTree);

    return statusCode;
  };

  const deleteNode = (nodeName, depth) => {
   
    const newTree = {...tree};
    depth.pop();
    const node = getNodeByDeep(newTree,depth);
    const siblindList = node.children;
    const index = siblindList.findIndex(element => element.node === nodeName );
    siblindList.splice(index, 1);
    
    const statusCode = updateAPI(newTree);

    return statusCode;
  };

  const initialLoad = remoteTree => {
      setTree(remoteTree);
  }

  return { tree, setNewNode, deleteNode, initialLoad };
}

export const useTreeContext = () => {
    return useContext(TreeContext);
};

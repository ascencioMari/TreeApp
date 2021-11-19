import { useTreeContext } from "../useTree";

export const DrawTree = ({node, depth}) => {

  const tree = useTreeContext();
  depth = depth === undefined ? [] : depth;
  let counter = 0;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newNode = {"node": e.target[0].value};
    tree.setNewNode(newNode,depth);
    e.target[0].value = "";
  };

  const handleClick = (e) => {
    const nodeName = e.target.name;
    tree.deleteNode(nodeName,depth);
  };

    return (
      <li>
        <p>{node.node}</p>
        {depth.length > 0 && <button onClick={ e => handleClick(e)} name={node.node}>❌</button>}
        {node.children && (
          <ol>
            {node.children.map(element => {
              const newDepth = [...depth, counter];
              counter++;
              return <DrawTree node={ element } key={ element.node } depth={ newDepth } />
            })}
            {node.children && (
              <form onSubmit={ e => handleSubmit(e) } className="input-padding" >
                <input type="text" required />
              </form>
            )}
          </ol>
        )}
      </li>
    );
  };
  
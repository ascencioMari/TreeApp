export const DrawTree = ({node}) => {
    return (
      <li>
        <p>{node.node}</p>
        {node.children && (
          <ol>
            {node.children.map(element => (
              <DrawTree node={element} key={element.node}/>
            ))}
          </ol>
        )}
      </li>
    );
  };
  
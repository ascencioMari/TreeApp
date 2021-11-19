export const DrawTree = ({node}) => {
    return (
      <ol>
        <li>
          <p>{node.node}</p>
          {node.children && node.children.map(element => (
            <DrawTree node={element} key={element.node}/>
          ))}
        </li>
      </ol>
    );
  };
  
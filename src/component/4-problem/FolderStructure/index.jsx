import { useState } from "react";
import classes from "./styles.module.scss";

const folderData = {
  name: "root",
  isFolder: true,
  children: [
    {
      name: "public",
      isFolder: true,
      children: [
        { name: "index.html", isFolder: false },
        { name: "favicon.ico", isFolder: false },
      ],
    },
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.js", isFolder: false },
        { name: "index.js", isFolder: false },
        {
          name: "component",
          isFolder: true,
          children: [
            { name: "StarReview", isFolder: false },
            { name: "FolderStructure", isFolder: false },
          ],
        },
      ],
    },
    { name: "package.json", isFolder: false },
  ],
};

const FolderNode = ({ node, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (node.isFolder) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={classes.node}>
      <div
        className={classes.item}
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={handleToggle}
      >
        <span className={classes.icon}>
          {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
        </span>
        <span>{node.name}</span>
      </div>

      {node.isFolder && isOpen && (
        <div className={classes.children}>
          {node.children?.map((child) => (
            <FolderNode
              key={`${depth}-${child.name}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderStructure = () => {
  return (
    <div className={classes.container}>
      <FolderNode node={folderData} />
    </div>
  );
};

export default FolderStructure;

import "./cell-list-item.css";
import ActionBar from "./action-bar";
import { Cell } from "../redux/cell";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element | null = null;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else if (cell.type === "text") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;

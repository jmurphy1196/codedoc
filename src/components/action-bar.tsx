import "./action-bar.css";
import { useActions } from "../hooks/use-actions";
import ActionButton from "./action-button";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <ActionButton
        icon="arrow-up"
        type="primary"
        onClick={() => moveCell(id, "up")}
      />
      <ActionButton
        icon="arrow-down"
        type="primary"
        onClick={() => moveCell(id, "down")}
      />
      <ActionButton
        icon="times"
        type="secondary"
        onClick={() => deleteCell(id)}
      />
    </div>
  );
};

export default ActionBar;

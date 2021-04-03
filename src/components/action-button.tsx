interface ActionButtonProps {
  icon: string;
  type: "primary" | "secondary" | "danger";
  onClick: () => {};
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, type, onClick }) => {
  return (
    <button className={`button is-${type} is-small`} onClick={onClick}>
      <span className="icon">
        <i className={`fas fa-${icon}`}></i>
      </span>
    </button>
  );
};

export default ActionButton;

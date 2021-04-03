import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import Navbar from "./navbar";
import React from "react";
interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell, ind) => {
    if (cell) {
      return (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </React.Fragment>
      );
    }
  });
  return (
    <>
      <Navbar />
      <div className="cell-list">
        {" "}
        <AddCell
          forceVisibility={cells.length > 0 ? false : true}
          previousCellId={null}
        />
        {renderedCells}
      </div>
    </>
  );
};

export default CellList;

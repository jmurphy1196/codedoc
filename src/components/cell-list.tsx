import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import Navbar from "./navbar";
import ErrorMessage from "./error-message";
import React, { useEffect } from "react";

interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id]);
  });
  const errors = useTypedSelector((state) => state.user.errors);

  const { getCodeDoc } = useActions();

  useEffect(() => {
    let currentUrl: string[] = window.location.href.split("/");
    currentUrl = currentUrl.filter((el) => el !== "");
    if (currentUrl.length === 4) {
      const userId: string = currentUrl[currentUrl.length - 2];
      const documentName = currentUrl[currentUrl.length - 1];
      getCodeDoc(documentName, null, true, userId);
    }
  }, []);

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
      {errors !== [] && errors[0] && errors[0].message && (
        <div style={{ padding: " 1.5rem" }}>
          <ErrorMessage message={errors[0].message} />
        </div>
      )}
      <div className='cell-list'>
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

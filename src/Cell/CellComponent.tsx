import React, { FC } from "react";
import { CellProps } from "./CellProps";

const CellComponent: FC<CellProps> = ({ cell }) => {
  return (
    <div className={["cell", cell.color].join(" ")}>
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};

export default CellComponent;

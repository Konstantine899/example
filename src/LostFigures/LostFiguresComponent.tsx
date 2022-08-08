import React, { FC } from "react";
import { LostFiguresProps } from "./LostFiguresProps";

const LostFiguresComponent: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}
          {figure.logo && <img src={figure.logo} width={20} height={20} />}
        </div>
      ))}
    </div>
  );
};

export default LostFiguresComponent;

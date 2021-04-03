import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (id: string) => {
  const cumulativeCode = useTypedSelector(({ cells: { data, order } }) => {
    const orderedCells = order.map((cellId) => data[cellId]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector("#root");
          if (typeof value === 'object' ){
            if(value.$$typeof && value.props){
              _ReactDOM.render(value, root);

            } else {

              root.innerHTML = JSON.stringify(value);
            }

          } else {

            root.innerHTML = value;
          }
        };
      `;

    const showFuncNoOP = `
       var show = () => {}
       
       `;
    const cumulativeCodeOrder = [];
    for (let cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === id) {
          cumulativeCodeOrder.push(showFunc);
        } else {
          cumulativeCodeOrder.push(showFuncNoOP);
        }
        cumulativeCodeOrder.push(cell.content);
      }
      if (cell.id === id) {
        break;
      }
    }
    return cumulativeCodeOrder;
  });

  return cumulativeCode.join("\n");
};

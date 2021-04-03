import "./code-cell.css";
import CodeEditor from "./code-editor";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../redux/cell";
import { useActions } from "../hooks/use-actions";
import { useCumulativeCode } from "../hooks/use-cumulative-code";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    let codeBundlerTimer: any;
    if (bundle === undefined) {
      createBundle(id, content);
      return;
    }
    codeBundlerTimer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(codeBundlerTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, id, createBundle, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 15px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

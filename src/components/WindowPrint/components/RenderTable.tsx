import React from "react";
import "../index.scss";

/** ❗❗❗❗columns的类型，width属性总宽度之和不能大于100% */
export interface PrintTableColumnsType {
  title?: string; // th 的文字显示
  show?: boolean; // 是否显示 默认: true
  /** 宽度,总宽度之和不能大于100% */
  width?: string;
  align?: any; // 对齐方式
  dataIndex: string; // 渲染数据对应的key
  render?: (
    _text: string,
    _record: Record<string, any>,
    index: number
  ) => React.JSX.Element | string; // 自定义渲染
  tdMethods?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >; // td的额外属性
}
interface Props {
  dataList: Record<string, any>[][];
  /** columns的width属性总宽度之和不能大于100% */
  columns: PrintTableColumnsType[];
  headerContent?: (index: number, totalPages: number) => JSX.Element;
  footerContent?: (index: number, totalPages: number) => JSX.Element;
  tdMethods?: Record<string, any>; // td 增加额外的属性
  printFooterIsClingTable?: boolean; // 底部页脚是否紧贴表格
}
const renderTable = ({
  dataList = [],
  columns,
  headerContent,
  footerContent,
  printFooterIsClingTable,
}: Props) => {
  let indexNumber = 0;

  // 渲染tbody
  const renderTableBody = (listItem: Record<string, any>[]) => {
    return (
      <>
        <colgroup>
          {columns.map((col, colIndex) =>
            col.show === false ? undefined : (
              <col width={col.width} key={colIndex} />
            )
          )}
        </colgroup>
        <tbody>
          <tr className="thead tbody-thead" style={{ whiteSpace: "pre-wrap" }}>
            {columns.map((col, colIndex) =>
              col.show === false ? undefined : (
                <td key={colIndex} style={{ textAlign: col.align || "center" }}>
                  {col.title}
                </td>
              )
            )}
          </tr>
          {(listItem || []).map((item, index) => {
            indexNumber++;
            return (
              <tr id={index + ""} className="content" key={index}>
                {columns.map((col, colIndex) => {
                  const { show, dataIndex, render, tdMethods = {} } = col;
                  let renderText: any = "";
                  if (show === false) {
                    return undefined;
                  }
                  if (typeof render === "function") {
                    renderText = render(item[dataIndex], item, indexNumber);
                    if (renderText === false) {
                      return undefined;
                    }
                  }
                  return (
                    <td
                      key={colIndex}
                      style={{ textAlign: col.align || "center" }}
                      {...tdMethods}
                      className={
                        " threeHidden" +
                        (tdMethods.className ? " " + tdMethods.className : "")
                      }
                    >
                      {typeof render === "function"
                        ? renderText
                        : typeof item[dataIndex] !== "undefined" &&
                          item[dataIndex] !== null
                        ? item[dataIndex]
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </>
    );
  };
  return (
    <>
      {dataList.map((listItem, index) => {
        return (
          <div
            style={{
              height: "100%",
            }}
          >
            <div
              className="page"
              style={
                printFooterIsClingTable ? { justifyContent: "normal" } : {}
              }
              key={index}
            >
              <>
                <table className="table">
                  {headerContent && headerContent(index, dataList.length)}
                  {listItem && listItem.length > 0 && renderTableBody(listItem)}
                </table>
                {footerContent && footerContent(index, dataList.length)}
              </>
            </div>
            <div style={{ pageBreakAfter: "always" }} />
          </div>
        );
      })}
    </>
  );
};

export default renderTable;

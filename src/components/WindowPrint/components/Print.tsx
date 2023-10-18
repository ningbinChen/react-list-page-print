import React from "react";
import { useRef, useEffect, useState, useImperativeHandle } from "react";
import type { MutableRefObject } from "react";
import RenderTable, { PrintTableColumnsType } from "./RenderTable";
import "../index.scss";
export type PrintRefType = { handlePrint: () => void };
export type PrintType = {
  printRef: MutableRefObject<PrintRefType | undefined>;
  data: Record<string, any>[];
  /** ❗❗❗❗请注意一定用thead标签包起来，因为Print文件计算高度时是读取thead标签 */
  headerContent?: (index: number, totalPages: number) => JSX.Element; // 头部
  /** ❗❗❗❗请注意一定要给最外层标签加上footer类名，因为Print文件计算高度时是读取footer类名 */
  footerContent?: (index: number, totalPages: number) => JSX.Element; // 底部签名
  /** ❗❗❗❗columns的width属性总宽度之和不能大于100% */
  columns: PrintTableColumnsType[];
  /** 底部页脚是否紧贴表格 */
  printFooterIsClingTable?: boolean;
  /** 是否每页都显示底部签名 */
  printFooterEachPageIsShow?: boolean;
  /** 纸张规格 landscape | portrait | triplicateForm */
  sheetSize?: "landscape" | "portrait" | "triplicateForm";
  /** 打印预览关闭后需要执行的操作 */
  handleClosePrint?: () => void;
};
const size = {
  landscape: { width: 1070, height: 770 }, // A4横向打印尺寸
  portrait: { width: 770, height: 1070 }, // A4纵向打印尺寸
  triplicateForm: { width: 790, height: 480 }, // 三联打印尺寸
};
/** 💥💥💥💥若想调试打印样式，请注释printContent类名下的position、z-index、overflow、opacity样式 */
const Print = ({
  printRef,
  data,
  headerContent,
  footerContent,
  columns,
  printFooterIsClingTable,
  printFooterEachPageIsShow,
  sheetSize = "landscape",
  handleClosePrint,
  ...props
}: PrintType) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpenClose, setIsOpenClose] = useState(false); // 是否打开了打印调试窗口
  const [pageList, setPageList] = useState<Record<string, any>[][]>([]);
  const printContentKeyRef = useRef<number>(
    Date.now() + Math.floor(Math.random() * 10000)
  );
  const [reloadNum, setReloadNum] = useState(0);
  const [pageListNum, setPageListNum] = useState(0);
  // 触发打印的事件
  const handlePrint = () => {
    setReloadNum(reloadNum + 1);
  };
  const onPrint = () => {
    setIsOpenClose(true);
    setTimeout(() => {
      const printContentDom = document.getElementById(
        printContentKeyRef.current + "printContent"
      );
      const theadDom = printContentDom?.querySelector("thead");
      const tbodyDom = printContentDom?.querySelector("tbody");
      const tbodyTheadDom = tbodyDom?.querySelector(".tbody-thead");
      const footerDom = printContentDom?.querySelector(".footer");
      const tbodyTrAllList = tbodyDom?.querySelectorAll(".content") || [];
      const theadDomHeight = theadDom?.clientHeight || 0; // 头部的高
      const tbodyTheadDomHeight = tbodyTheadDom?.clientHeight || 0; // tbody表头的高
      const footerDomHeight = footerDom?.clientHeight || 0; // 底部签名的高
      let tbodyContentHeight =
        size[sheetSize].height - theadDomHeight - tbodyTheadDomHeight; // 剩余tbody内容高度
      // 当每页都显示底部签名时，就要减去底部签名的高。得到剩余tbody内容高度
      if (printFooterEachPageIsShow) {
        tbodyContentHeight = tbodyContentHeight - footerDomHeight;
      }
      if (pageList.length <= 1) {
        const pageListNew: Record<string, any>[][] = [];
        let allTrHeight = 0;
        let list: Record<string, any>[] = [];
        (pageList[0] || []).forEach((item, index) => {
          item.sign = index; // 差一个对应td索引的标记
          const trHeight = tbodyTrAllList[index]?.clientHeight || 0;
          list.push(item);
          allTrHeight += trHeight;
          if (allTrHeight < tbodyContentHeight) {
            if (index === pageList[0].length - 1) {
              pageListNew.push([...list]);
              allTrHeight = 0;
              list = [];
            }
          } else {
            list.pop();
            pageListNew.push([...list]);
            allTrHeight = trHeight;
            list = [item];
            if (index === pageList[0].length - 1) {
              pageListNew.push([...list]);
              allTrHeight = 0;
              list = [];
            }
          }
        });
        // 当只在最后一页显示底部签名时特殊处理
        if (!printFooterEachPageIsShow) {
          // 最后一页需要有底部签字栏，所以需要对最后一页做处理
          const listEnd = pageListNew.pop() || []; // 最后一页的数据
          listEnd.forEach((item, index) => {
            const trHeight = tbodyTrAllList[item.sign]?.clientHeight || 0; // 获取最后一页每个td的高
            list.push(item);
            allTrHeight += trHeight;
            if (allTrHeight < tbodyContentHeight - footerDomHeight) {
              if (index === listEnd.length - 1) {
                pageListNew.push([...list]);
                allTrHeight = 0;
                list = [];
              }
            } else {
              list.pop();
              pageListNew.push([...list]);
              allTrHeight = trHeight;
              list = [item];
              if (index === listEnd.length - 1) {
                pageListNew.push([...list]);
                allTrHeight = 0;
                list = [];
              }
            }
          });
        }
        setPageList(pageListNew);
      }
      // 因为useState更新时异步
      // 💥💥💥💥若想调试打印样式，请注释printContent类名下的position、z-index、overflow、opacity样式
      setTimeout(() => {
        const printContent = `
		  <html>
		    <head>
		      <title>打印预览</title>
		      <link rel="stylesheet" type="text/css" href="/WindowPrint.css" />
		      <style>
						.printContent {
							font-size: ${sheetSize === "triplicateForm" ? "12px" : "14px"};
						}
            tr td {
              font-size: ${sheetSize === "triplicateForm" ? "12px" : "14px"};
            }
						.headLeftItem{
							font-size: ${"12px"};
						}
						.title {
							font-size: ${sheetSize === "triplicateForm" ? "16px" : "24px"};
						}
						.pageNumber {
							font-size: ${sheetSize === "triplicateForm" ? "12px" : "16px"};
						}
						.code {
							font-size: ${"12px"};
						}
						@media print {
							@page {
								size: ${sheetSize === "portrait" ? "portrait" : "landscape"};
								margin: ${
                  sheetSize === "triplicateForm"
                    ? "0mm 28mm 5mm 2mm"
                    : "5mm 5mm"
                } !important;
							}
						}
		      </style>
		    </head>
		    <body>
		      <div class="printContent">${targetRef.current?.innerHTML}</div>
		    </body>
		  </html>
		`;
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
        iframeDocument?.open();
        iframeDocument?.write(printContent);
        setTimeout(() => {
          iframe.contentWindow?.print();
          document.body.removeChild(iframe);
          handleClosePrint && handleClosePrint();
          setIsOpenClose(false);
          setReloadNum(0);
          setPageListNum(0);
        }, 500);
      }, 0);
    }, 0);
  };
  useEffect(() => {
    // 物资分页
    if (data && data.length > 0) {
      const newTableData: Record<string, any>[][] = [data];
      setPageList(newTableData);
    }
  }, [data]);
  useEffect(() => {
    if (pageList.length !== 0) {
      setPageListNum(pageListNum + 1);
    }
  }, [pageList]);
  useEffect(() => {
    if (reloadNum === 1 && pageListNum === 1) {
      onPrint();
    }
  }, [reloadNum, pageListNum]);

  // 暴露方法
  useImperativeHandle(printRef, () => ({
    handlePrint,
  }));

  return (
    <div
      id={printContentKeyRef.current + "printContent"}
      // triplicateForm 为三联单时追加的样式
      className={
        "printContent" +
        (sheetSize === "triplicateForm" ? " triplicateForm" : "")
      }
      ref={targetRef}
      style={{ width: size[sheetSize].width, height: size[sheetSize].height }}
    >
      {isOpenClose && (
        <RenderTable
          headerContent={headerContent}
          footerContent={footerContent}
          columns={columns}
          printFooterIsClingTable={printFooterIsClingTable}
          dataList={pageList}
        />
      )}
    </div>
  );
};

export default Print;

import {
  PrintingToolRecord,
  headDocumentFieldType,
  pageFooterFieldType,
  tableHeadDocumentFieldType,
} from "./types";
import React, {
  MutableRefObject,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import Qrcode from "qrcode.react";
import "./index.scss";
import Print, { PrintRefType } from "./components/Print";
import { PrintTableColumnsType } from "./components/RenderTable";
import { useMemo } from "react";
export type PrintType = {
  printRef: MutableRefObject<PrintRefType | undefined>;
  data?: Record<string, any>;
  searchParams?: Record<string, any>;
  printCode?: string;
  isMapParams?: boolean; // 是否需要处理searchParams传入的参数
};
/** 💥💥💥💥若想调试打印样式，请注释printContent类名下的position、z-index、overflow、opacity样式 */
const WindowPrint = ({
  printRef,
  data = {},
  printCode = " ",
  searchParams = {},
  isMapParams,
}: PrintType) => {
  const [printConfig, setPrintConfig] = useState<PrintingToolRecord>({});
  const [reloadNum, setReloadNum] = useState(0);
  const [goodsList, setGoodsList] = useState<Record<string, any>[]>([]);
  const [summary, setSummary] = useState<Record<string, any>>({});
  const [isOpenPrint, setIsOpenPrint] = useState(false); // 是否打开了浏览器打印预览
  const ref = useRef<PrintRefType>();
  const getPrintConfig = async (code: string) => {
    // const res = await http({ code }); // 或服务端配置化
    setPrintConfig({
      id: 42,
      name: "中心仓库验收单打印",
      code: "receiving_list_print",
      printType: "a4hengban",
      customized: false,
      timeModified: 1686541654786,
      modifiedBy: "超级管理员",
      showHeadTitle: true,
      showHospitalName: true,
      hospitalName: "xxxxx医院",
      customText: "物资入库单",
      headShowCenter: undefined,
      showHeadCode: true,
      showHeadPageNumber: true,
      showHeadDocument: true,
      headDocumentColumn: 3,
      headDocumentContentMaxLine: 3,
      showTableHeadDocument: true,
      tableHeadDocumentColumn: 3,
      tableHeadDocumentContentMaxLine: 3,
      showTableList: true,
      tableListContentMaxLine: 3,
      showPageFooter: true,
      pageFooterShowPageNumber: undefined,
      pageFooterFieldsShowEveryPage: undefined,
      pageFooterCloseToTable: true,
      pageFooterLine: 2,
      pageFooterColumn: 4,
      headCodeKey: "receivingCode",
      headDocumentField: [
        {
          id: 472,
          key: "receivingCode",
          columnName: "验收单号：",
          index: 5,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 474,
          key: "invoiceCode",
          columnName: "发票编号：",
          index: 10,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 476,
          type: "timestamp",
          formatter: "yyyy-MM-dd",
          key: "invoicingDate",
          columnName: "开票日期：",
          index: 15,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
      ],
      tableHeadDocumentField: [
        {
          id: 475,
          key: "distributorName",
          columnName: "配送商业：",
          index: 15,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 477,
          key: "ambivalentPlatformOrder",
          columnName: "两定平台订单：",
          index: 20,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 478,
          key: "warehouseName",
          columnName: "验收仓库：",
          index: 25,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 479,
          key: "inspectorName",
          columnName: "验收人员：",
          index: 30,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 480,
          type: "long",
          formatter: ",###.####",
          key: "totalAmount",
          columnName: "合计(元)：",
          index: 35,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 481,
          type: "timestamp",
          formatter: "yyyy-MM-dd HH:mm:ss",
          key: "actualAcceptanceDate",
          columnName: "验收日期：",
          index: 40,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: 4,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
      ],
      listField: [
        {
          id: 473,
          key: "none",
          columnName: "序号",
          index: 5,
          isVisible: true,
          width: 4,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 460,
          key: "goodsName",
          columnName: "物资名称",
          index: 10,
          isVisible: true,
          width: 11,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 461,
          key: "specificationAndModel",
          columnName: "规格/型号",
          index: 15,
          isVisible: true,
          width: 10,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 462,
          key: "manufacturername",
          columnName: "生产厂家",
          index: 20,
          isVisible: true,
          width: 11,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 463,
          key: "lotAndSerialNo",
          columnName: "批号/序列号",
          index: 25,
          isVisible: true,
          width: 8,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 464,
          type: "timestamp",
          formatter: "yyyy-MM-dd",
          key: "productionDate",
          columnName: "生产日期",
          index: 30,
          isVisible: true,
          width: 8,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 465,
          type: "timestamp",
          formatter: "yyyy-MM-dd",
          key: "sterilizationDate",
          columnName: "灭菌日期",
          index: 35,
          isVisible: true,
          width: 8,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 466,
          type: "timestamp",
          formatter: "yyyy-MM-dd",
          key: "expirationDate",
          columnName: "有效期至",
          index: 40,
          isVisible: true,
          width: 8,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 467,
          key: "passed_quantity",
          columnName: "通过数",
          index: 45,
          isVisible: true,
          width: 6,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 468,
          type: "long",
          formatter: ",###.####",
          key: "price",
          columnName: "单价(元)",
          index: 50,
          isVisible: true,
          width: 6,
          align: "right",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 469,
          type: "long",
          formatter: ",###.####",
          key: "totalPrice",
          columnName: "总价(元)",
          index: 55,
          isVisible: true,
          width: 8,
          align: "right",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
        {
          id: 470,
          key: "operatorBarcodeDesc",
          columnName: "物资条码/UDI",
          index: 60,
          isVisible: true,
          width: 12,
          align: "center",
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: undefined,
        },
      ],
      pageFooterField: [
        {
          id: 482,
          key: "none",
          columnName: "负责人员：",
          index: 45,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 483,
          key: "none",
          columnName: "会计人员：",
          index: 50,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 484,
          key: "none",
          columnName: "验收人员：",
          index: 55,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 485,
          key: "none",
          columnName: "复核人员：",
          index: 60,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 486,
          key: "none",
          columnName: "签字日期：",
          index: 65,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 487,
          key: "none",
          columnName: "签字日期：",
          index: 70,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 488,
          key: "none",
          columnName: "签字日期：",
          index: 75,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
        {
          id: 489,
          key: "none",
          columnName: "签字日期：",
          index: 80,
          isVisible: true,
          width: 150,
          align: undefined,
          isRetrieval: undefined,
          numberOfColumns: undefined,
          isShowCode: undefined,
          footerFieldType: "string",
        },
      ],
    });
  };
  const getList = async (data: {
    params: Record<string, any>;
    pageNum: number;
    pageSize: number;
    templateCode: string;
  }) => {
    // const res = await http(data); // 或服务端请求数据
    const datas = [
      {
        id: null,
        textResult: null,
        paginationResult: null,
        singleResult: null,
        rawsResult: [
          {
            specificationAndModel: "PT5 PLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel: "PT5 PLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel: "PT5 PLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel: "PT5 PLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel: "PT5 PLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },

          {
            specificationAndModel: "sssssPLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel:
              "jjjjjjjjjjjjPLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
          {
            specificationAndModel: "tttttPLUS自锁中转矩022 3#带钩51027CP-2-22/",
            productionDate: "2022-10-11",
            passed_quantity: "1副",
            lotAndSerialNo: "1702472302",
            sterilizationDate: "",
            manufacturername: "cccccccc有限公司",
            totalPrice: "1330.00",
            price: "1330.00",
            operatorBarcodeDesc: "010693495591702917250225301101702472302",
            goodsName: "正畸托槽",
            expirationDate: "2025-02-25",
          },
        ],
        summaryResult: null,
      },
      {
        id: null,
        textResult: null,
        paginationResult: null,
        singleResult: null,
        rawsResult: null,
        summaryResult: [
          {
            actualAcceptanceDate: "2023-10-18 13:45:53",
            receivingCode: "WA_0107_0471_231018_0013",
            none: null,
            invoiceCode: "",
            warehouseName: "中心库",
            inspectorName: "SPD系统",
            distributorName: "杭州康欣医疗器械有限公司",
            totalAmount: "1330.00",
            invoicingDate: "",
            ambivalentPlatformOrder: "否",
          },
        ],
      },
    ];
    datas.forEach((item: any) => {
      if (item.rawsResult && item.rawsResult.length > 0) {
        setGoodsList(item.rawsResult);
      }
      if (item.summaryResult && item.summaryResult.length > 0) {
        setSummary(item.summaryResult[0]);
      }
    });
  };

  const handlePrint = () => {
    setReloadNum(reloadNum + 1);
  };

  const onPrint = async () => {
    const nweSearchParams = { ...searchParams };
    if (isOpenPrint) {
      return;
    }
    setIsOpenPrint(true);
    if (isMapParams) {
      if (nweSearchParams.templateId) delete nweSearchParams.templateId;
      // @ts-ignore
      await getList({ ...nweSearchParams, templateCode: printCode });
      ref.current?.handlePrint();
      return;
    }
    const { pageNum, pageSize, sortList } = nweSearchParams;
    delete nweSearchParams.pageNum;
    delete nweSearchParams.pageSize;
    delete nweSearchParams.sortList;
    const params = {
      pageNum,
      pageSize,
      sortList,
      params: { ...nweSearchParams, ...data },
      templateCode: printCode,
    };
    await getList(params);
    ref.current?.handlePrint();
  };

  useEffect(() => {
    if (reloadNum > 0) {
      onPrint();
    }
  }, [reloadNum]);

  useEffect(() => {
    printCode && getPrintConfig(printCode);
  }, [printCode]);

  /**
   * 分割成多个数组的方法
   * @param {number} size 分割后每个数组的长度
   */
  const chunkArray = (
    arr:
      | headDocumentFieldType[]
      | tableHeadDocumentFieldType[]
      | pageFooterFieldType[] = [],
    size: number = 1
  ) => {
    var newArr: pageFooterFieldType[][] = [];
    let newSize = !size ? 1 : size;
    for (var i = 0; i < arr.length; i += newSize) {
      newArr.push(arr.slice(i, i + newSize));
    }
    return newArr;
  };
  // ❗❗❗❗columns的width属性总宽度之和不能大于100%
  const columns = useMemo(() => {
    const { showTableList, listField, tableListContentMaxLine } = printConfig;
    const list: PrintTableColumnsType[] = [];
    if (!showTableList) {
      return [];
    }
    (listField || []).forEach((item) => {
      const { columnName, key, isVisible, align, isShowCode, width } = item;
      if (isVisible) {
        if (columnName === "序号" || key === "index") {
          list.push({
            title: columnName,
            dataIndex: key,
            width: width + "%",
            align,
            render: (
              _text: string,
              _record: Record<string, any>,
              index: number
            ) => (
              <p style={{ WebkitLineClamp: tableListContentMaxLine }}>
                {index}
              </p>
            ),
          });
        } else if (isShowCode) {
          list.push({
            title: columnName,
            dataIndex: key,
            width: width + "%",
            align,
            render: (text: string) =>
              text ? (
                // @ts-ignore
                <Qrcode
                  value={`${text}`}
                  style={{ width: "56px", height: "56px", margin: "0 auto" }}
                  renderAs="svg"
                />
              ) : (
                "-"
              ),
          });
        } else {
          list.push({
            title: columnName,
            dataIndex: key,
            width: width + "%",
            align,
            render: (text: string) =>
              text ? (
                <p style={{ WebkitLineClamp: tableListContentMaxLine }}>
                  {text}
                </p>
              ) : (
                "-"
              ),
          });
        }
      }
    });
    return list;
  }, [printConfig]);
  // 头部
  // ❗❗❗❗如需自定义创建头部请注意一定用thead标签包起来，因为Print文件计算高度时是读取thead标签
  const headerContent = (index: number, totalPages: number) => {
    let {
      showHeadTitle,
      showHospitalName,
      hospitalName,
      customText,
      headShowCenter,
      showHeadCode,
      showHeadPageNumber,
      headCodeKey,
      showHeadDocument,
      headDocumentContentMaxLine,
      headDocumentColumn,
      showTableHeadDocument,
      tableHeadDocumentContentMaxLine,
      tableHeadDocumentColumn,
    } = printConfig;
    const headDocumentField: headDocumentFieldType[][] = chunkArray(
      (printConfig.headDocumentField || []).filter((item) => item.isVisible),
      headDocumentColumn
    );
    const tableHeadDocumentField: tableHeadDocumentFieldType[][] = chunkArray(
      (printConfig.tableHeadDocumentField || []).filter(
        (item) => item.isVisible
      ),
      tableHeadDocumentColumn
    );
    return showHeadTitle ||
      showHeadCode ||
      showHeadDocument ||
      showTableHeadDocument ? (
      <thead>
        {(showHeadTitle || showHeadCode || showHeadDocument) && (
          <tr className="noBorder">
            <td colSpan={columns.filter((item) => item.show !== false).length}>
              <div className="listTitle">
                <div style={{ flex: 1 }} className="titleInfo">
                  {/* 标题+页码 */}
                  <p
                    className="title"
                    style={headShowCenter ? { textAlign: "center" } : {}}
                  >
                    {showHeadTitle
                      ? `${showHospitalName ? hospitalName : ""}${customText}`
                      : ""}
                    {showHeadCode && showHeadPageNumber && (
                      <span className="pageNumber" style={{ right: 10 }}>
                        页码：{index + 1 + "-" + totalPages}
                      </span>
                    )}
                  </p>
                  {/* 打印头部信息区域 */}
                  {showHeadDocument &&
                    headDocumentField.map((itemList) => (
                      <div className="headLeft">
                        {itemList.map((item) => (
                          <div
                            className="headLeftItem"
                            style={{
                              WebkitLineClamp: headDocumentContentMaxLine,
                            }}
                          >
                            {item.columnName}
                            {item.key && summary[item.key]
                              ? summary[item.key]
                              : item.key === "none"
                              ? ""
                              : "-"}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
                {/* 二维码 */}
                {showHeadCode && headCodeKey && summary[headCodeKey] && (
                  // @ts-ignore
                  <Qrcode
                    value={`${summary[headCodeKey]}`}
                    style={{ width: "80px", height: "80px" }}
                    renderAs="svg"
                  />
                )}
              </div>
            </td>
          </tr>
        )}
        {showTableHeadDocument &&
          tableHeadDocumentField.map((itemList) => (
            <tr className="thead">
              {itemList.map((item) => (
                <td
                  colSpan={item.numberOfColumns}
                  className="threeHidden"
                  style={{
                    WebkitLineClamp: tableHeadDocumentContentMaxLine,
                  }}
                >
                  <p>
                    {item.columnName}
                    {item.key && summary[item.key]
                      ? summary[item.key]
                      : item.key === "none"
                      ? ""
                      : "-"}
                  </p>
                </td>
              ))}
            </tr>
          ))}
      </thead>
    ) : (
      <></>
    );
  };
  // 底部签字
  // ❗❗❗❗如需自定义创建底部请注意一定要给最外层标签加上footer类名，因为Print文件计算高度时是读取footer类名
  const footerContent = (index: number, totalPages: number) => {
    let {
      showPageFooter,
      pageFooterShowPageNumber,
      pageFooterFieldsShowEveryPage,
      pageFooterColumn,
    } = printConfig;
    const pageFooterField: pageFooterFieldType[][] = chunkArray(
      printConfig.pageFooterField,
      pageFooterColumn
    );
    return showPageFooter ? (
      <div
        className="footer"
        // 因为底部页码是定位在那的，所以当底部有页码时需要留出底部页码的空间
        style={pageFooterShowPageNumber ? { paddingBottom: 24 } : {}}
      >
        {(pageFooterFieldsShowEveryPage || index === totalPages - 1) &&
          pageFooterField.map((itemList) => (
            <div className="footerItem">
              {itemList.map((item) => (
                <div style={{ flex: 1 }}>
                  {item.columnName ? `${item.columnName}` : ""}
                  {item.key && summary[item.key] ? summary[item.key] : ""}
                </div>
              ))}
            </div>
          ))}
        {pageFooterShowPageNumber && (
          <div className="footerPage">{index + 1 + "/" + totalPages}</div>
        )}
      </div>
    ) : (
      <></>
    );
  };
  // 暴露方法
  useImperativeHandle(printRef, () => ({
    handlePrint,
  }));
  return (
    <Print
      printRef={ref}
      data={goodsList}
      headerContent={headerContent}
      footerContent={footerContent}
      columns={columns}
      printFooterIsClingTable={printConfig.pageFooterCloseToTable}
      printFooterEachPageIsShow={printConfig.pageFooterFieldsShowEveryPage}
      sheetSize={
        printConfig.printType === "a4shuban"
          ? "portrait"
          : printConfig.printType === "a4hengban"
          ? "landscape"
          : "triplicateForm"
      }
      handleClosePrint={() => {
        setIsOpenPrint(false);
      }}
    />
  );
};

export default WindowPrint;

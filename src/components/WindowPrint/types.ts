export type headDocumentFieldType = {
  type?: string;
  formatter?: string;
  id?: number;
  isShowCode?: boolean;
  footerFieldType?: string;
  numberOfColumns?: number;
  isRetrieval?: string;
  width?: number;
  align?: string;
  index?: number;
  columnName?: string;
  key?: string;
  isVisible?: boolean;
}
export type tableHeadDocumentFieldType = {
  type?: string;
  formatter?: string;
  id?: number;
  isShowCode?: boolean;
  footerFieldType?: string;
  isRetrieval?: string;
  width?: number;
  align?: string;
  index?: number;
  columnName?: string;
  key?: string;
  isVisible?: boolean;
  numberOfColumns?: number;
}
export type listFieldType = {
  type?: string;
  formatter?: string;
  id?: number;
  footerFieldType?: string;
  numberOfColumns?: number;
  isRetrieval?: string;
  index?: number;
  columnName?: string;
  key: string;
  isVisible?: boolean;
  align?: 'center' | 'right' | 'left';
  isShowCode?: boolean;
  width?: number;
}
export type pageFooterFieldType = {
  id?: number;
  isShowCode?: boolean;
  footerFieldType?: string;
  numberOfColumns?: number;
  isRetrieval?: string;
  width?: number;
  align?: string;
  isVisible?: boolean;
  index?: number;
  columnName?: string;
  key?: string;
}
export type PrintingToolRecord = {
  id?: number;
  type?: string;
  formatter?: string;
  customized?: boolean;
  timeModified?: number;
  modifiedBy?: string;
  name?: string;
  code?: string;
  isShowCode?: boolean;
  footerFieldType?: string;
  numberOfColumns?: number;
  isRetrieval?: string;
  width?: number;
  align?: string;
  isVisible?: boolean;
  index?: number;
  printType?: 'a4shuban' | 'a4hengban' | 'sanliandan';
  // 打印头部标题
  showHeadTitle?: boolean;
  showHospitalName?: boolean;
  hospitalName?: string;
  customText?: string;
  headShowCenter?: boolean;
  // 打印头部二维码
  showHeadCode?: boolean;
  showHeadPageNumber?: boolean;
  headCodeKey?: string;
  // 打印单头部信息
  showHeadDocument?: boolean;
  headDocumentContentMaxLine?: number;
  headDocumentColumn?: number;
  headDocumentField?: headDocumentFieldType[];
  // 表格头部信息
  showTableHeadDocument?: boolean;
  tableHeadDocumentContentMaxLine?: number;
  tableHeadDocumentColumn?: number;
  tableHeadDocumentField?: tableHeadDocumentFieldType[];
  // 表格列表
  showTableList?: boolean;
  tableListContentMaxLine?: number;
  listField?: listFieldType[];
  // 打印页脚
  showPageFooter?: boolean;
  pageFooterShowPageNumber?: boolean;
  pageFooterFieldsShowEveryPage?: false;
  pageFooterCloseToTable?: boolean;
  pageFooterLine?: number;
  pageFooterColumn?: number;
  pageFooterField?: pageFooterFieldType[];
}
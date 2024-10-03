export interface ProviderModel {
    children: React.ReactNode;
  }

export interface PaginationModel<T> {
    itemList:    T[];
    currentPage: number;
    totalPages:  number;
    pageSize:    number;
    totalCount:  number;
    summary:     string;
    hasPrevious: boolean;
    hasNext:     boolean;
}
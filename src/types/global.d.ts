declare interface PaginationData {
  current_page: number;
  detail: number[];
  from: number;
  next_page: number;
  last_page: number;
  prev_page: number;
  to: number;
  total: number;
  per_page: number;
}

declare interface ApiResponse<Data = []> {
  success: boolean;
  message: string;
  data: Data;
  pagination?: PaginationData;
  error: ApiError;
}

declare interface ApiError {
  error_code:
    | "UNAUTHORIZED"
    | "VALIDATION_ERROR"
    | "PROCESS_ERROR"
    | "EMAIL_COUNTDOWN_ERROR"
    | "NOT_FOUND"
    | "NOT_MEMBER"
    | "";
  error_data: ValidationError;
}

type ValidationError = Record<string, string[]>;

declare interface TokenPayload {
  token: string;
}

declare interface IdPayload<Id = number> {
  id: Id;
}

declare interface BodyPayload<Body> {
  body: Body;
}

declare interface ParamsPayload<Params> {
  params: Params;
}

declare interface ParamsPayloadOptional<Params> {
  params?: Params;
}

declare interface FiltersPayload<Filters> {
  filters: Filters;
}

declare interface FiltersPayloadOptional<Filters> {
  filters?: Filters;
}

declare interface PagePayload {
  page: number;
}

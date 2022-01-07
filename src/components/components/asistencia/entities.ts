import { ApiCallState } from "../../../redux/entities";

export interface IListAsistStudents {
  idStudent: string;
  nombre: string;
  status: boolean;
}

export interface AsistState extends ApiCallState {
  AsistList: IListAsistStudents[];
  editing?: ApiCallState & { course: IListAsistStudents };
}

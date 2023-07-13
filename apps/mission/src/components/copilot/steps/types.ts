export interface SetUpAccountI {
  id: string;
  name: string;
  checkAction: () => boolean | Promise<boolean>;
  loading: string[];
  done: string;
  actions: Array<() => boolean | Promise<boolean>>;
  href?: string;
  status: string;
  errors?: string[];
}

export interface GroupStateI {
  id: string;
  index: number;
  status: string;
}

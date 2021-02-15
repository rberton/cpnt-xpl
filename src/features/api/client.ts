export interface IClient {
  method: string
  payload: any
}

export default function Client({ method, payload }: IClient): Promise<() => {}> {
  
  return new Promise(
    () => {}
  );
}

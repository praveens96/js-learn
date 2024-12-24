export interface LoglistParams {
  list: string[];
}
export function Loglist({ list }: LoglistParams) {
  return (
    <ul>
      {list.map((log, i) => (
        <li key={`${log}-${i}`}>{log}</li>
      ))}
    </ul>
  );
}

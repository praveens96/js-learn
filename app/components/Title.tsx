export interface TitleParams {
  title: string;
}
export default function Title({ title }: TitleParams) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "1%",
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

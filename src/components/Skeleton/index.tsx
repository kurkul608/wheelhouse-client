export const Skeleton = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "200px",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
};

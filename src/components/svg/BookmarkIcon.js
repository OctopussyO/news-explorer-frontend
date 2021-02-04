const BookmarkIcon = ({
  className = '',
  pathClassName = '',
  width = 14,
  height = 19,
  fill = '#B6BCBF',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // style={{ pointerEvents: "none" }}
    >
      <path
        className={pathClassName}
        d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z"
        stroke={fill}
        strokeWidth="2"
        fill="#ffffff00"
      />
    </svg>
  );
};

export default BookmarkIcon;

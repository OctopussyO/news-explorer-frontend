const TrashIcon = ({
  className = '',
  pathClassName = '',
  width = 18,
  height = 19,
  fill = '#B6BCBF',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClassName}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0H6v2H0v2h18V2h-6V0zM2 6v11a2 2 0 002 2h10a2 2 0 002-2V6h-2v11H4V6H2zm4 0v9h2V6H6zm4 0v9h2V6h-2z"
        fill={fill}
      />
    </svg>
  )
};

export default TrashIcon;

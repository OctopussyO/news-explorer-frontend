const CloseIcon = ({
  className = '',
  pathClassName = '',
  width = 24,
  height = 24,
  fill = '#fff',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClassName}
        d="M13.414 12L18 16.586A1 1 0 1116.586 18l-5.39-5.39a.862.862 0 010-1.22L16.586 6A1 1 0 1118 7.414L13.414 12z"
        fill={fill}
      />
      <path
        className={pathClassName}
        d="M10.879 12l-4.586 4.586A1 1 0 007.707 18l5.39-5.39a.862.862 0 000-1.22L7.707 6a1 1 0 00-1.414 1.414L10.879 12z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;

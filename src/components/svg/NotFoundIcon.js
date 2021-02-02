const NotFoundIcon = ({
  className = '',
  pathClassName = '',
  width = 96,
  height = 96,
  fill = '#D1D2D6',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="43"
        cy="43"
        r="36.5"
        stroke={fill}
      />
      <path
        className={pathClassName}
        d="M69 69l19.5 19.5M58.328 55.959c-3.667-4.261-9.1-6.96-15.164-6.96-6.063 0-11.496 2.699-15.164 6.96"
        stroke={fill}
      />
      <circle
        cx="55.5"
        cy="33.5"
        r="1.5"
        fill={fill}
      />
      <circle
        cx="30.5"
        cy="33.5"
        r="1.5"
        fill={fill}
      />
    </svg>
  );
};

export default NotFoundIcon;

import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = {
  waves: {
    position: "relative",
    width: "100%",
    marginBottom: -4,
    height: "2vw",
    minHeight: "3vw",
  },
  "@keyframes moveForever": {
    from: { transform: "translate3d(-90px, 0, 0)" },
    to: { transform: "translate3d(90px, 0, 0)" }, // Increased the translation value
  },
  parallax: {
    "& > use": {
      animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
      animationDelay: (props) => `-${props.animationNegativeDelay}s`,
    },
  },
};

function WaveBorder(props) {
  const id = String(Math.random());
  const {
    className,
    lowerColor,
    upperColor,
    classes,
    animationNegativeDelay =0,
    ...rest
  } = props;
  return (
    <div className={className} style={{ background: upperColor }} {...rest}>
      <svg
        className={classes.waves}
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id={id}
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={classes.parallax}>
          <use href={`#${id}`} x="48" y="0" fill={lowerColor} />
        </g>
      </svg>
    </div>
  );
}

WaveBorder.propTypes = {
  lowerColor: PropTypes.string.isRequired,
  upperColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  animationNegativeDelay: PropTypes.number.isRequired,
};

export default withStyles(styles)(WaveBorder);
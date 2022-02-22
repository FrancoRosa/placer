import {
  faFlag,
  faFlagCheckered,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { sortByColor, sortByColorPlaced } from "../js/helpers";

const PileSummary = () => {
  const waypoints = useStoreState((state) => state.waypoints);
  const center = useStoreState((state) => state.center);
  const selectedColor = useStoreState((state) => state.selectedColor);
  const setSelectedColor = useStoreActions(
    (actions) => actions.setSelectedColor
  );
  const [pileColors, setPileColors] = useState(sortByColor(waypoints));
  const [pilesPlaced, setPilesPlaced] = useState(sortByColorPlaced(waypoints));

  useEffect(() => {
    setPileColors(sortByColor(waypoints));
    setPilesPlaced(sortByColorPlaced(waypoints));
  }, [waypoints]);

  return (
    <>
      <hr className="m-0 p-0 mb-4" />
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-flex-centered">
          <FontAwesomeIcon
            onClick={() => setSelectedColor("")}
            icon={faFlagCheckered}
            className="is-size-3"
            color={selectedColor}
          />
          <p className="heading has-text-centered has-text-link is-size-5 m-0 p-0">
            Placed
          </p>
          <p className="heading has-text-centered has-text-success is-size-5 m-0 p-0">
            {waypoints.filter((x) => x.placed).length} / {waypoints.length}
          </p>
        </div>
        <div className="column is-four-fifths">
          <div className="columns">
            {Object.keys(pileColors).map((color) => (
              <div
                className="column has-text-centered m-0 p-0"
                aria-label={color}
              >
                <p className="is-size-7 m-0 p-0">
                  {pilesPlaced[color] ? pilesPlaced[color] : 0} /{" "}
                  {pileColors[color]}
                </p>
                <FontAwesomeIcon
                  icon={faFlag}
                  onClick={() => setSelectedColor(color)}
                  color={color}
                  className="is-size-3"
                />
                <p>
                  {(
                    (100 * (pilesPlaced[color] ? pilesPlaced[color] : 0)) /
                    pileColors[color]
                  ).toFixed()}{" "}
                  %
                </p>
              </div>
            ))}
          </div>
          <hr className="m-0 p-0" />
          <p className="has-text-centered" style={{ color: selectedColor }}>
            {selectedColor == "" ? "No layer selected" : selectedColor}
          </p>
        </div>
        <div className="column is-centered has-text-centered">
          <FontAwesomeIcon
            icon={faLocationArrow}
            transform={{ rotate: center.heading - 45 }}
            className="has-text-white is-size-1"
          />
          <p className="is-size-4">{center.heading.toFixed(1)}॰</p>
          <p className="is-link help">
            {(center.accuracy * 3.28084).toFixed(1)}ft
          </p>
        </div>
      </div>
    </>
  );
};

export default PileSummary;

import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { playBeep, playColor, playOther } from "../js/audio";

const NextPile = ({ index }) => {
  const nextPiles = useStoreState((state) => state.nextPiles);
  const center = useStoreState((state) => state.center);
  const beep = useStoreState((state) => state.beep);
  const placeWaypoint = useStoreActions((actions) => actions.placeWaypoint);
  const clearPile = useStoreActions((actions) => actions.clearPile);
  const [progressValue, setProgressValue] = useState(0);
  const [progressColor, setProgressColor] = useState("red");
  const waypoint = nextPiles[index];

  const handlePilePlacement = () => {
    placeWaypoint(waypoint.pile_id);
    clearPile(index);
  };

  useEffect(() => {
    if (center.distance !== undefined) {
      let distance = Math.abs(center.distance[index]);
      if (distance > 25) {
        setProgressColor("is-danger");
        setProgressValue(1);
      }
      if (distance < 15) {
        setProgressColor("is-warning");
        setProgressValue(2);
      }
      if (distance < 6) {
        setProgressColor("is-success");
        setProgressValue(3);
      }
      if (beep) playBeep(distance);
    }
  }, [waypoint.distance]);

  return (
    <div className="column is-flex is-flex-centered is-flex-direction-column">
      {waypoint.pile_id && (
        <>
          <p className="heading title is-5 mb-4">Id: {waypoint.pile_id}</p>
          <div
            className="flag-icon color_red"
            onClick={() => {
              index == 0 ? playOther("leftBay") : playOther("rightBay");
              setTimeout(() => {
                playColor(waypoint.color?.trim());
              }, 1000);
            }}
          >
            <FontAwesomeIcon icon={faFlag} color={waypoint.color} />
          </div>
          <p className="heading has-text-centered">{waypoint.color}</p>
          <p className="title is-3 has-text-centered mt-3 mb-4">
            {center.distance !== undefined && center.distance[index].toFixed(1)}{" "}
            ft
          </p>
          <progress
            className={`progress rotate ${progressColor}`}
            max="3"
            value={progressValue}
          />
          <div className="is-flex is-flex-centered">
            <button
              onClick={handlePilePlacement}
              className="button is-outlined is-success"
            >
              Place
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NextPile;

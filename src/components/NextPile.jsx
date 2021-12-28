import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { playColor, playOther } from "../js/audio";

const NextPile = ({ index }) => {
  const nextPiles = useStoreState((state) => state.nextPiles);
  const center = useStoreState((state) => state.center);
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
    if (center.distY !== undefined) {
      let distance = Math.abs(center.distY[index]);
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
    }
  }, [waypoint.distance]);

  return (
    <div className="column">
      {waypoint.pile_id && (
        <>
          <div className="is-flex has-text-centered is-flex-direction-column is-align-content-center mb-4">
            <p className="heading title is-5">Id: {waypoint.pile_id}</p>
            <p className="heading f-4">Lat {waypoint.lat?.toFixed(8)}</p>
            <p className="heading f-4">Lng {waypoint.lng?.toFixed(8)}</p>
            <p className="heading f-4">N {waypoint.x}</p>
            <p className="heading f-4">E {waypoint.y}</p>
          </div>
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
            {Math.abs(center.distY[index]).toFixed(1)} ft
          </p>
          <progress
            class={`progress rotate ${progressColor}`}
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

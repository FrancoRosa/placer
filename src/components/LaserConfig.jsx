import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getLaserStatus, setLaserConfig } from "../js/api";
import { useLocalStorage } from "../js/helpers";
import NumberInput from "./NumberInput";

const LaserConfig = () => {
  const [connected, setConnected] = useState(false);
  const [port, setPort] = useState();
  const [manual, setManual] = useLocalStorage("laserAuto", true);
  const [on, setOn] = useLocalStorage("laserOn", true);
  const [rectWidth, setRectWidth] = useLocalStorage("laserRWidth", 0);
  const [rectHeight, setRectHeight] = useLocalStorage("laserRHeight", 0);
  const [targetX, setTargetX] = useLocalStorage("laserTargetX", 0);
  const [targetY, setTargetY] = useLocalStorage("laserTargetY", 0);
  const [targetZ, setTargetZ] = useLocalStorage("laserTargetZ", 0);

  const handleSave = () => {
    const payload = {
      h: rectHeight,
      w: rectWidth,
      x: targetX,
      y: targetY,
      z: targetZ,
      on,
      manual,
    };
    setLaserConfig(payload).then((res) => console.log(res));
  };

  useEffect(() => {
    getLaserStatus().then((res) => {
      setConnected(res.connected);
      setPort(res.port);
    });
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div>
            <h1
              className={`has-text-centered title is-size-4 ${
                connected ? "has-text-success" : "has-text-danger"
              }`}
            >
              {connected ? "Laser connected at: " : "Laser disconnected"}
              <span>{connected && port}</span>
            </h1>
          </div>
          <hr />
          <div className="columns">
            <div className="column">
              <NumberInput
                label="Rectangle width (ft)"
                value={rectWidth}
                placeholder="E.g: 5"
                changeHandler={setRectWidth}
              />
            </div>
            <div className="column">
              <NumberInput
                label="Rectangle height (ft)"
                value={rectHeight}
                placeholder="E.g: 5"
                changeHandler={setRectHeight}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <NumberInput
                label="Target X (ft)"
                value={targetX}
                placeholder="E.g: 5"
                changeHandler={setTargetX}
              />
            </div>
            <div className="column">
              <NumberInput
                label="Target Y (ft)"
                value={targetY}
                placeholder="E.g: 5"
                changeHandler={setTargetY}
              />
            </div>
            <div className="column">
              <NumberInput
                label="Target Z (ft)"
                value={targetZ}
                placeholder="E.g: 5"
                changeHandler={setTargetZ}
              />
            </div>
          </div>
          <div className="is-flex is-flex-centered">
            <button
              onClick={handleSave}
              className="button is-outlined is-success"
            >
              Save
            </button>
            <button
              onClick={handleSave}
              className="button is-outlined is-success"
            >
              Save
            </button>
            <button
              onClick={handleSave}
              className="button is-outlined is-success"
            >
              Save
            </button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LaserConfig;

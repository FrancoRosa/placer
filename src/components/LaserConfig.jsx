import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getLaserStatus,
  setLaserBlink,
  setLaserConfig,
  setLaserOn,
} from "../js/api";
import { useLocalStorage } from "../js/helpers";
import NumberInput from "./NumberInput";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const LaserConfig = () => {
  const [connected, setConnected] = useState(false);
  const [port, setPort] = useState();
  const [manual, setManual] = useLocalStorage("laserAuto", true);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useLocalStorage("laserOn", true);
  const [blink, setBlink] = useLocalStorage("laserBlink", true);
  const [rectWidth, setRectWidth] = useLocalStorage("laserRWidth", 0);
  const [rectHeight, setRectHeight] = useLocalStorage("laserRHeight", 0);
  const [targetX, setTargetX] = useLocalStorage("laserTargetX", 0);
  const [targetY, setTargetY] = useLocalStorage("laserTargetY", 0);
  const [targetZ, setTargetZ] = useLocalStorage("laserTargetZ", 0);
  const [targetA, setTargetA] = useLocalStorage("laserTargetA", 0);

  const handleSave = () => {
    const payload = {
      h: rectHeight,
      w: rectWidth,
      x: targetX,
      y: targetY,
      z: targetZ,
      a: targetA,
      manual,
    };
    setLaserConfig(payload).then((res) => console.log(res));
  };

  const handleOn = () => {
    setOn(!on);
    setLaserOn({ on: !on });
  };

  const handleBlink = () => {
    setBlink(!blink);
    setLaserBlink({ blink: !blink });
  };

  const handleLaserStatus = () => {
    setLoading(true);
    getLaserStatus().then((res) => {
      setConnected(res.connected);
      setPort(res.port);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleLaserStatus();
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
            <div className="is-flex is-flex-centered">
              <button
                className={`button is-outlined ${loading && "is-loading"}`}
                onClick={handleLaserStatus}
              >
                <FontAwesomeIcon icon={faRedo} />
              </button>
            </div>
          </div>
          <hr />
          <div className="columns">
            <NumberInput
              label="Rectangle width (ft)"
              value={rectWidth}
              placeholder="E.g: 5"
              changeHandler={setRectWidth}
            />
            <NumberInput
              label="Rectangle height (ft)"
              value={rectHeight}
              placeholder="E.g: 5"
              changeHandler={setRectHeight}
            />
          </div>
          <hr />
          <div className="columns">
            <NumberInput
              label="Target X (ft)"
              value={targetX}
              placeholder="E.g: 5"
              changeHandler={setTargetX}
            />
            <NumberInput
              label="Target Y (ft)"
              value={targetY}
              placeholder="E.g: 5"
              changeHandler={setTargetY}
            />
            <NumberInput
              label="Target Z (ft)"
              value={targetZ}
              placeholder="E.g: 5"
              changeHandler={setTargetZ}
            />
            <NumberInput
              label="Tilt Angle (deg)"
              value={targetA}
              placeholder="E.g: 20"
              changeHandler={setTargetA}
            />
          </div>
          <div className="is-flex is-flex-centered">
            <button
              onClick={handleOn}
              className={`button is-outlined m-4 ${
                on ? "is-success" : "is-danger"
              }`}
            >
              {on ? "Laser on" : "Laser off"}
            </button>
            <button
              onClick={handleBlink}
              className={`button is-outlined m-4 ${
                blink ? "is-success" : "is-danger"
              }`}
            >
              {blink ? "Blink on" : "Blink off"}
            </button>
            <button
              onClick={() => setManual(!manual)}
              className={`button is-outlined m-4 ${
                manual ? "is-danger" : "is-success"
              }`}
            >
              {manual ? "Manual mode" : "Automatic mode"}
            </button>
          </div>
          <hr />
          <div className="is-flex is-flex-centered">
            <button
              onClick={handleSave}
              className="button is-outlined is-success m-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaserConfig;

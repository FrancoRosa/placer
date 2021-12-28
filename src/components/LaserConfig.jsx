import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getSerialPorts } from "../js/api";
import NumberInput from "./NumberInput";

const LaserConfig = () => {
  const [serialPorts, setSerialPorts] = useState([]);
  const [rectWidth, setRectWidth] = useState();
  const [rectHeight, setRectHeight] = useState();

  useEffect(() => {
    getSerialPorts().then((res) => setSerialPorts(res.serial_ports));
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="" className="label">
              Serial Port
            </label>
            <div className="select">
              <select>
                {serialPorts.map((s) => (
                  <option>{s}</option>
                ))}
              </select>
            </div>
            <button className="button">Connect</button>
          </div>
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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LaserConfig;

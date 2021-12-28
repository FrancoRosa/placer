import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberInput from "./NumberInput";

const LaserConfig = () => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <NumberInput label="Truck length" placeholder="E.g: 5" />
            <NumberInput label="Truck width" placeholder="E.g: 5" />
            <NumberInput label="Truck height" placeholder="E.g: 5" />
          </div>
          <div className="columns">
            <NumberInput label="Antenna from left" placeholder="E.g: 5" />
            <NumberInput label="Antenna from truck head" placeholder="E.g: 5" />
          </div>
          <div className="columns">
            <NumberInput label="Bay 1 from truck head" placeholder="E.g: 5" />
            <NumberInput label="Bay 2 from truck head" placeholder="E.g: 5" />
          </div>
          <div className="columns">
            <NumberInput label="EPSG code" placeholder="E.g: 6588" />
            <div className="column is-flex-direction-column is-flex is-flex-centered">
              <p className="heading has-text-link">EPSG Reference</p>
              <a target="blank" className="has-text-white title is-2">
                <FontAwesomeIcon icon={faFileAlt} />
              </a>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LaserConfig;

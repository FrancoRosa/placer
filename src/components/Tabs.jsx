import {
  faTools,
  faMapMarked,
  faBug,
  faSun,
  faSatelliteDish,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "./Tab";

const Tabs = () => {
  return (
    <div className="tabs is-centered m-0">
      <ul>
        <Tab name="Map" icon={faMapMarked} />
        <Tab name="Config" icon={faTools} />
        <Tab name="Debug" icon={faBug} />
        <Tab name="Laser" icon={faSun} />
        <Tab name="GPS" icon={faSatelliteDish} />
        <Tab name="Cam" icon={faVideo} />
      </ul>
    </div>
  );
};

export default Tabs;

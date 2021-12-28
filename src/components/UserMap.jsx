import { useStoreActions, useStoreState } from "easy-peasy";
import DeckGL from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import { BitmapLayer, PolygonLayer, ScatterplotLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { useEffect, useState } from "react";
import { getWaypoints, setRefWaypoint, socket } from "../js/api";
import { useLocalStorage, colors, colorsFill } from "../js/helpers";
import { playColor, playOther } from "../js/audio";
import mapboxgl from "mapbox-gl";
import marooka from "../assets/marooka-top.bmp";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoia20xMTVmcmFuY28iLCJhIjoiY2t0eXQ3cHBhMGI3aTMxcG14dnN0OHJveSJ9.LWxkBiVPF9UfGWMI4sWakQ";

const INITIAL_VIEW_STATE = {
  longitude: -122.123801,
  latitude: 37.893394,
  zoom: 21,
  maxZoom: 21,
  pitch: 60,
  bearing: 0,
};

const UserMap = () => {
  const center = useStoreState((state) => state.center);
  const setCenter = useStoreActions((actions) => actions.setCenter);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [autoCenter, setAutoCenter] = useState(true);
  const [truck, setTruck] = useState([
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ]);
  const [lasers, setLasers] = useState([]);
  const [truckBundle, setTruckBundle] = useState([]);
  const [verticalLine, setVerticalLine] = useState([]);
  const [horizontalLine, setHorizontalLine] = useState([]);
  const [bays, setBays] = useState([
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ]);
  const nextPiles = useStoreState((state) => state.nextPiles);
  const setNextPiles = useStoreActions((actions) => actions.setNextPiles);
  const waypoints = useStoreState((state) => state.waypoints);
  const setWaypoints = useStoreActions((actions) => actions.setWaypoints);
  const placeWaypoint = useStoreActions((actions) => actions.placeWaypoint);
  const unplaceWaypoint = useStoreActions((actions) => actions.unplaceWaypoint);
  const [initialCenter, setInitialCenter] = useLocalStorage("debugCenter", {
    lat: 0,
    lng: 0,
  });
  const selectedColor = useStoreState((state) => state.selectedColor);

  const socketListener = () => {
    socket.on("message", (msg) => {
      const parsedMsg = JSON.parse(msg);
      console.log(parsedMsg);

      setCenter(parsedMsg);
      setViewState({
        ...viewState,
        longitude: parseFloat(parsedMsg.lng),
        latitude: parseFloat(parsedMsg.lat),
        bearing: parseFloat(parsedMsg.heading),
      });

      setTruck([
        { lat: parsedMsg.truck[0][0], lng: parsedMsg.truck[0][1] },
        { lat: parsedMsg.truck[1][0], lng: parsedMsg.truck[1][1] },
        { lat: parsedMsg.truck[2][0], lng: parsedMsg.truck[2][1] },
        { lat: parsedMsg.truck[3][0], lng: parsedMsg.truck[3][1] },
        { lat: parsedMsg.truck[0][0], lng: parsedMsg.truck[0][1] },
      ]);

      setBays([
        { lat: parsedMsg.bays[0][0], lng: parsedMsg.bays[0][1] },
        { lat: parsedMsg.bays[1][0], lng: parsedMsg.bays[1][1] },
      ]);

      setVerticalLine([
        { lat: parsedMsg.truck[4][0], lng: parsedMsg.truck[4][1] },
        { lat: parsedMsg.truck[5][0], lng: parsedMsg.truck[5][1] },
      ]);

      setHorizontalLine([
        { lat: parsedMsg.truck[10][0], lng: parsedMsg.truck[10][1] },
        { lat: parsedMsg.truck[11][0], lng: parsedMsg.truck[11][1] },
      ]);

      setTruckBundle([
        { lat: parsedMsg.truck[6][0], lng: parsedMsg.truck[6][1] },
        { lat: parsedMsg.truck[7][0], lng: parsedMsg.truck[7][1] },
        { lat: parsedMsg.truck[8][0], lng: parsedMsg.truck[8][1] },
        { lat: parsedMsg.truck[9][0], lng: parsedMsg.truck[9][1] },
        { lat: parsedMsg.truck[6][0], lng: parsedMsg.truck[6][1] },
      ]);

      setLasers([
        { lat: parsedMsg.truck[12][0], lng: parsedMsg.truck[12][1] },
        { lat: parsedMsg.truck[13][0], lng: parsedMsg.truck[13][1] },
      ]);
    });
  };

  useEffect(() => {
    getWaypoints().then((res) => {
      setWaypoints(
        res.waypoints.map((waypoint) => ({ ...waypoint, selected: true }))
      );
      if (res.waypoints.length > 0) {
        setCenter({ ...center, ...res.waypoints[0] });
        setViewState({
          ...viewState,
          latitude: res.waypoints[0].lat,
          longitude: res.waypoints[0].lng,
        });
      }
    });

    socketListener();

    return () => {
      socket.off("message");
    };
  }, []);

  const getNearestPiles = (waypoints, bays) => {
    let distanceBay1;
    let distanceBay2;
    let closestBay1;
    let closestBay2;
    let closestDistanceBay1 = 10000;
    let closestDistanceBay2 = 10000;

    waypoints.forEach((point) => {
      if (
        !point.placed &&
        (selectedColor == point.color || selectedColor == "")
      ) {
        distanceBay1 =
          (point.lat - bays[0].lat) ** 2 + (point.lng - bays[0].lng) ** 2;
        distanceBay2 =
          (point.lat - bays[1].lat) ** 2 + (point.lng - bays[1].lng) ** 2;
        if (distanceBay1 < closestDistanceBay1) {
          closestDistanceBay1 = distanceBay1;
          closestBay1 = point;
        }
        if (distanceBay2 < closestDistanceBay2) {
          closestDistanceBay2 = distanceBay2;
          closestBay2 = point;
        }
      }
    });

    // The code below avoids repeating the same waypoint as next pile
    if (closestBay1 == closestBay2) {
      if (closestDistanceBay1 < closestDistanceBay2) {
        closestBay2 = { lat: 0, lng: 0 };
      } else {
        closestBay1 = { lat: 0, lng: 0 };
      }
    }

    return [closestBay1, closestBay2];
  };

  const getNextPiles = (waypoints, bays) => {
    if (waypoints.length > 0) {
      const nearestPiles = getNearestPiles(waypoints, bays);
      setNextPiles(nearestPiles);
      setRefWaypoint(nearestPiles);
      console.log("... getting colors");
      let timeOffset = 0;
      try {
        let leftColor = waypoints
          .filter((w) => w.pile_id == nearestPiles[0].pile_id)[0]
          .color.trim();
        playOther("leftBay");
        setTimeout(() => playColor(leftColor), 1000);
        timeOffset = 2000;
      } catch {
        console.log("error left color");
      }
      try {
        let rightColor = waypoints
          .filter((w) => w.pile_id == nearestPiles[1].pile_id)[0]
          .color.trim();
        setTimeout(() => playOther("rightBay"), 0 + timeOffset);
        setTimeout(() => playColor(rightColor), 1000 + timeOffset);
      } catch {
        console.log("error right color");
      }
    }
  };

  useEffect(() => {
    if (Object.keys(center).includes("distance")) {
      let tempPiles = [...nextPiles];
      tempPiles[0].distance = center.distance[0];
      tempPiles[1].distance = center.distance[1];
      setNextPiles(tempPiles);
    }
  }, [center]);

  useEffect(() => {
    if (autoCenter) {
      socket.off("message");
      socketListener();
    } else {
      socket.off("message");
    }
  }, [autoCenter]);

  useEffect(() => {
    setWaypoints(
      waypoints.map((waypoint) => ({
        ...waypoint,
        selected: waypoint.color == selectedColor || selectedColor == "",
      }))
    );
  }, [selectedColor]);

  const handlePileClick = (d) => {
    const pile_id = d.object.pile_id;
    const placed = d.object.placed;
    if (placed) unplaceWaypoint(pile_id);
    else placeWaypoint(pile_id);
  };

  return (
    <>
      <div className="container map">
        <DeckGL
          initialViewState={viewState}
          controller={true}
          getTooltip={({ object }) =>
            object &&
            `Code: ${object.pile_id}\nColor: ${object.color}\n${
              object.placed ? "Placed" : "Not Placed"
            }`
          }
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
          <MapView
            x={"80%"}
            y={"80%"}
            height={"15%"}
            width={"15%"}
            clear={true}
            controller
          />
          <ScatterplotLayer
            lineWidthMaxPixels={3}
            lineWidthMinPixels={2}
            getRadius={(d) => (d.selected ? (d.placed ? 0.3 : 1) : 0.01)}
            data={waypoints}
            getPosition={(d) => [d.lng, d.lat]}
            getColor={(d) => colors[d.color]}
            getFillColor={(d) => colorsFill[d.color]}
            getLineColor={(d) => colors[d.color]}
            filled={true}
            stroked={true}
            pickable={true}
            opacity={0.8}
            onClick={handlePileClick}
          />

          <BitmapLayer
            bounds={[
              [truck[3].lng, truck[3].lat, 0],
              [truck[0].lng, truck[0].lat, 0],
              [truck[1].lng, truck[1].lat, 0],
              [truck[2].lng, truck[2].lat, 0],
            ]}
            image={marooka}
          />

          <ScatterplotLayer
            lineWidthMaxPixels={2}
            lineWidthMinPixels={1}
            getRadius={0.3}
            data={[
              // gps center
              {
                coordinates: [parseFloat(center.lng), parseFloat(center.lat)],
                color: colors.black,
                height: 10,
              },
              // laser positions
              {
                coordinates: [center.truck[12][1], center.truck[12][0]],
                color: colors.green,
                height: 10,
              },
              {
                coordinates: [center.truck[13][1], center.truck[13][0]],
                color: colors.green,
                height: 10,
              },
              // Bays positions
              {
                coordinates: [bays[0].lng, bays[0].lat],
                color: colors.red,
                height: 0,
              },
              {
                coordinates: [bays[1].lng, bays[1].lat],
                color: colors.red,
                height: 0,
              },
            ]}
            getPosition={(d) => d.coordinates}
            getColor={(d) => d.color}
            filled={false}
            stroked
          />

          <PolygonLayer
            data={[
              {
                contour: [
                  [truck[0].lng, truck[0].lat],
                  [truck[1].lng, truck[1].lat],
                  [truck[2].lng, truck[2].lat],
                  [truck[3].lng, truck[3].lat],
                ],
              },
            ]}
            stroked
            filled
            wireframe
            extruded
            lineWidthMinPixels={1}
            getPolygon={(d) => d.contour}
            getFillColor={colorsFill.lightgreen}
            getLineColor={colors.lightgreen}
            getLineWidth={0.1}
            getElevation={0.5}
          />
        </DeckGL>
      </div>
      <div className="columns mt-3 has-text-link ">
        <div className="column is-flex is-flex-centered m-0 p-0">
          <p className="heading has-text-centered m-0 p-0 f-3">
            Lat: {parseFloat(center.lat).toFixed(7)}
          </p>
        </div>
        <div className="column is-flex is-flex-centered m-0 p-0">
          <p className="heading has-text-centered m-0 p-0 f-3">
            Lng: {parseFloat(center.lng).toFixed(7)}
          </p>
        </div>
        <div className="column is-flex is-flex-centered m-0 p-0">
          <p className="heading has-text-centered m-0 p-0 f-3">
            Hdg: {parseFloat(center.heading).toFixed(1)}॰
          </p>
        </div>
        <div className="column is-flex is-flex-centered m-0 p-0">
          <button
            className={`button is-outlined ml-2 mr-2 ${
              autoCenter ? "is-success" : "is-warning"
            }`}
            onClick={() => setAutoCenter(!autoCenter)}
          >
            {autoCenter ? "Auto center enabled" : "Auto center not enabled"}
          </button>
          <button
            className={`button is-outlined is-success ml-2 mr-2`}
            onClick={() => getNextPiles(waypoints, bays)}
            disabled={bays[0].lat == bays[1].lat && bays[0].lng == bays[1].lng}
          >
            Get nearest piles
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMap;

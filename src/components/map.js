import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import volcanoIcon from "../images/volcano.svg";

const Map = ({ eventData }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const [showPopup, togglePopup] = React.useState({
    _id: null,
    PopUp: false,
  });

  const markers = eventData.map((ev, idx) => {
    if (
      ev.categories[0].id === 8 ||
      (ev.categories[0].id === 12 && ev.geometries[0].coordinates.length === 2)
    ) {
      return (
        <>
          <Marker
            key={idx}
            id={ev.id}
            latitude={ev.geometries[0].coordinates[1]}
            longitude={ev.geometries[0].coordinates[0]}
            onClick={() => {
              togglePopup({ _id: ev.id, PopUp: true });
            }}
          >
            {ev.categories[0].id === 8 ? (
              <FontAwesomeIcon
                className="marker"
                icon={faFireAlt}
                style={{
                  color: "red",
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
              />
            ) : (
              <div className="skill icon-div">
                <img
                  className="marker"
                  src={volcanoIcon}
                  alt="Volcano"
                  style={{
                    color: "black",
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                />
              </div>
            )}
          </Marker>
          {showPopup && showPopup._id === ev.id && (
            <Popup
              latitude={ev.geometries[0].coordinates[1]}
              longitude={ev.geometries[0].coordinates[0]}
              closeButton={true}
              closeOnClick={false}
              // dynamicPosition={true}
              onClose={() => togglePopup(false)}
              anchor="top"
              className="popup-box"
            >
              <div className="popup-box">
                Title: <p className="title d-inline">{ev.title}</p>
              </div>
            </Popup>
          )}
        </>
      );
    }
    return null;
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      >
        {markers}
      </ReactMapGL>
    </div>
  );
};

export default Map;

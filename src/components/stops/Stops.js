import React from "react";
import Stop from "./Stop";

function Stops({
  addresses,
  currentStop,
  finishStop,
  openMapWithDirection
}) {
  return (
    <div>
      {addresses.map((address, index) => {
        return (
          <Stop
            stopData={address}
            key={address.barCode}
            index={index}
            currentStop={currentStop}
            finishStop={finishStop}
            openMapWithDirection={openMapWithDirection}
          />
        );
      })}
    </div>
  );
}

export default Stops;

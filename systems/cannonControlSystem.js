const cannonControlSystem = (entities, { touches }) => {
  touches.forEach(t => {
    let currentPower = entities.powerMeter.displayPower;
    let currentAngle = entities.angleMeter.angleLevel;

    if (t.type === "move") {
      const deltaY = t.delta.pageY;
      const deltaX = t.delta.pageX;

      // Define the sensitivity factor for interpolation
      const angleSensitivity = 0.08;
      const powerSensitiviy = 0.05

      // Interpolate power changes based on vertical movement
      const powerChange = -deltaY * angleSensitivity;
      entities.powerMeter.displayPower = Math.max(0, Math.min(75, currentPower + powerChange));

      // Interpolate angle changes based on horizontal movement
      const angleChange = -deltaX * powerSensitiviy;
      entities.angleMeter.angleLevel = Math.max(0, Math.min(180, currentAngle + angleChange));

      // Rotate the cannon visually
      entities.cannon.rotate = `-${entities.angleMeter.angleLevel}deg`;
    }
  });

  return entities;
};

export default cannonControlSystem;

const cannonControlSystem = (entities, { touches }) => {
  touches.forEach(t => {
    console.log('touch ', t)
    let currentPower = entities.gameData.displayPowerLevel.current;
    let currentAngle = entities.gameData.angleLevel.current;

    if (t.type === "move") {
      const deltaY = t.delta.pageY;
      const deltaX = t.delta.pageX;

      // Define the sensitivity factor for interpolation
      const angleSensitivity = 0.08;
      const powerSensitiviy = 0.05

      // Interpolate power changes based on vertical movement
      const powerChange = -deltaY * angleSensitivity;
      entities.gameData.displayPowerLevel.current = Math.max(0, Math.min(75, currentPower + powerChange));
      entities.gameData.setDisplayPowerLevel(entities.gameData.displayPowerLevel.current);
      // entities.gameData.powerLevel = Math.max(0, Math.min(100, entities.gameData.powerLevel + powerChange));
      entities.gameData.powerLevel = Math.max(0, Math.min(75, entities.gameData.powerLevel + powerChange));


      // Interpolate angle changes based on horizontal movement
      const angleChange = -deltaX * powerSensitiviy;
      entities.gameData.angleLevel.current = Math.max(0, Math.min(180, currentAngle + angleChange));
      entities.gameData.setAngleLevel(entities.gameData.angleLevel.current);
      entities.cannon.rotate = `-${entities.gameData.angleLevel.current}deg`;
    }
  });

  return entities;
};

export default cannonControlSystem;

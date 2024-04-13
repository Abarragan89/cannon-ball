export const getTotalStarsInMap = `
    SELECT m.mapName, SUM(l.earnedStars) as totalStars 
    FROM maps m
    LEFT JOIN levels l ON l.mapId=m.id
    WHERE m.mapName='basics'
    GROUP BY m.mapName;
`
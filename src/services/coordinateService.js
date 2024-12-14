import proj4 from 'proj4';

// Define WGS84 to SVY21 conversion
proj4.defs("EPSG:3414", "+proj=tmerc +lat_0=1.366666 +lon_0=103.833333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs");
const convertToSVY21 = (latitude, longitude) => {
    const svy21 = proj4("EPSG:4326", "EPSG:3414", [longitude, latitude]);
    console.log(`Converted WGS84 (${latitude}, ${longitude}) to SVY21: (${svy21[0]}, ${svy21[1]})`);
    return svy21;
};


// Euclidean distance for flat-plane (SVY21) coordinates
const euclideanDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 1000; // Convert meters to kilometers
};


// Update the filtering logic
export const filterCarparksByRadius = (userCoords, carparkData, radius) => {
    const [userX, userY] = convertToSVY21(userCoords[0], userCoords[1]);
    console.log("Converted User Coordinates (SVY21):", userX, userY);

    return carparkData.filter((carpark) => {
        const [carparkX, carparkY] = carpark.coordinates.split(',').map(Number);
        const distance = euclideanDistance(userX, userY, carparkX, carparkY);
        console.log(`Distance to ${carpark.name}: ${distance} km`);
        return distance <= radius;
    });
};

import proj4 from 'proj4';

// Define WGS84 to SVY21 conversion
proj4.defs("EPSG:3414", "+proj=tmerc +lat_0=1.366666 +lon_0=103.833333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs");

/**
 * Converts geographical coordinates (WGS84) to SVY21 projection coordinates.
 *
 * @function convertToSVY21
 * @param {number} latitude - Latitude in WGS84 projection.
 * @param {number} longitude - Longitude in WGS84 projection.
 * @returns {Array<number>} An array containing SVY21 x and y coordinates.
 *
 * @example
 * const svy21Coords = convertToSVY21(1.3521, 103.8198);
 * console.log(svy21Coords); // [28000.123, 38744.567]
 */

const convertToSVY21 = (latitude, longitude) => {
    const svy21 = proj4("EPSG:4326", "EPSG:3414", [longitude, latitude]);
    return svy21;
};

/**
 * Calculates the Euclidean distance between two points in SVY21 flat-plane coordinates.
 *
 * @function euclideanDistance
 * @param {number} x1 - X-coordinate of the first point.
 * @param {number} y1 - Y-coordinate of the first point.
 * @param {number} x2 - X-coordinate of the second point.
 * @param {number} y2 - Y-coordinate of the second point.
 * @returns {number} The Euclidean distance in kilometers.
 *
 * @example
 * const distance = euclideanDistance(28000, 38744, 29000, 39744);
 * console.log(distance); // 1.414 (kilometers)
 */

// Euclidean distance for flat-plane (SVY21) coordinates
const euclideanDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 1000; // Convert meters to kilometers
};

/**
 * Filters carparks within a specified radius from a user's coordinates.
 *
 * @function filterCarparksByRadius
 * @param {Array<number>} userCoords - The user's WGS84 coordinates as [latitude, longitude].
 * @param {Array<Object>} carparkData - Array of carpark objects, each containing `coordinates` as a string "x,y".
 * @param {number} radius - The radius in kilometers to filter carparks.
 * @returns {Array<Object>} A filtered array of carpark objects within the specified radius.
 *
 * @example
 * const userCoords = [1.3521, 103.8198];
 * const carparkData = [
 *   { coordinates: "28000,38744", name: "Carpark A" },
 *   { coordinates: "29000,39744", name: "Carpark B" }
 * ];
 * const nearbyCarparks = filterCarparksByRadius(userCoords, carparkData, 2);
 * console.log(nearbyCarparks); // [{ coordinates: "28000,38744", name: "Carpark A" }]
 */

// Update the filtering logic
export const filterCarparksByRadius = (userCoords, carparkData, radius) => {
    const [userX, userY] = convertToSVY21(userCoords[0], userCoords[1]);

    return carparkData.filter((carpark) => {
        const [carparkX, carparkY] = carpark.coordinates.split(',').map(Number);
        const distance = euclideanDistance(userX, userY, carparkX, carparkY);
        return distance <= radius;
    });
};

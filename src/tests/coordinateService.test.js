import { haversineDistance, filterCarparksByRadius } from '../services/coordinateService.js';

test('Haversine distance calculation', () => {
    const distance = haversineDistance(1.3521, 103.8198, 1.3000, 103.8000); // Sample SG coordinates
    expect(distance).toBeGreaterThan(0); // Assert positive distance
    expect(distance).toBeLessThan(10);   // Assert reasonable distance
});

test('Filter carparks by radius', () => {
    const userCoords = [1.3521, 103.8198]; // User WGS84 coordinates
    const carparkData = [
        { name: "Carpark 1", coordinates: "31045.6165, 31694.0055" },
        { name: "Carpark 2", coordinates: "31126.0755, 31564.9876" },
    ];
    const radius = 2; // km

    const filteredCarparks = filterCarparksByRadius(userCoords, carparkData, radius);
    expect(filteredCarparks.length).toBeGreaterThan(0); // At least one match
});
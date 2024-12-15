# SG CarPark Eh

SG CarPark Eh is a web application that helps users locate carparks in Singapore. The website allows users to search by carpark name, view all listed carparks, and find carparks near their location.

---

## Features

- **Search Carparks**: Find carparks by street name.
- **Nearby Carparks**: Discover carparks within a 3km radius of your location.
- **All Carparks Listed**: View a complete list of carparks.
- **Responsive Design**: Optimized for desktop and mobile users.
- **Dark Mode**: Toggle between light and dark themes for a personalized experience.

---

## Demo

- **High-Fidelity Prototype**: [View the prototype](https://drive.google.com/file/d/1Sn-p7YYSFSlptsLWucjKFJlUS4dWzCjX/view?usp=sharing)
- **Website-pages**: [View the product](https://drive.google.com/drive/folders/1-7zrAxvnYZfCo_Fa-rbf-6QQR7RyDiDJ?usp=sharing)
- **Video**: [Visit the demo](https://youtu.be/oLneiQjwsls)

---

## Project Structure

```yaml
SG-CarPark-Eh:
  frontend: # Frontend codebase
    build:            # Compiled production build
    public:           # Static assets (favicon, index.html)
    src:              # React source code
      pages:          # React pages
        - AllListed.js
        - Details.js
        - Find.js
        - Home.js
        - Introductory.js
        - Search.js
      styles:         # CSS files
        - AllListed.css
        - Details.css
        - Find.css
        - Global.css
        - Home.css
        - Introductory.css
        - Search.css
      - App.js        # Main app component
      - index.js      # Renders React app
      - reportWebVitals.js # Performance monitoring
    package.json:      # Frontend dependencies
    .gitignore:        # Git ignore rules
  backend: # Backend codebase
    controllers:       # API controllers
    routes:            # API route definitions
    services:          # API utilities
    - app.js           # Express app setup
    - server.js        # Server entry point
  .env:                # Environment variables
  LICENSE:             # Project license
  README.md:           # Project documentation
```
---

## API Endpoints

### Backend API

#### **GET /api/aggregated-carparks**
- **Description**: Fetch aggregated carpark data.
- **Parameters**:
  - `vehicleType`: Type of vehicle (e.g., Car, Motorcycle).
  - `query`: Search query for carpark names.

#### **GET /api/carparks**
- **Description**: Find nearby carparks based on user location.
- **Parameters**:
  - `latitude`: Latitude of the user's location.
  - `longitude`: Longitude of the user's location.
  - `radius`: Search radius in kilometers.
  - `vehicleType`: Type of vehicle (e.g., Car, Motorcycle).

#### **GET /api/carpark-info**
- **Description**: Fetch detailed information about a specific carpark.
- **Parameters**:
  - `carparkName`: Name of the carpark.
  - `vehicleType`: Type of vehicle (e.g., Car, Motorcycle).

---

## Framework

#### React for frontend
#### NodeJs and Express for backend and server

---

## Deployment

#### Frontend: Vercel
#### Backend: Render

---

## Responsive Design

The application is optimized for various devices:

- **Desktop**: Default layout with full features.
- **Tablet**: Adjusted spacing and font sizes for medium screens.
- **Mobile**: Stacked elements, full-width buttons, and smaller font sizes.

---

## Future Enhancements

Planned features and improvements:

- Merged with LTA and capital mall datasets for comprehensive coverage.
- Filtering carparks by amenities (e.g., EV chargers, sheltered parking).
- User authentication for personalized experiences such as able to favourite carpark spots.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Credits

- Data provided by the **Singapore URA Dataset**.
- UI icons sourced from **Font Awesome**.
- Developer by **Alvin Aw Yong**.

---

## Contact

For questions or suggestions, please email: `alvinawyong.aay@gmail.com`

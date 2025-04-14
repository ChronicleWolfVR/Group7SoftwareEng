# SmartHome IoT Management

## Overview

SmartHome IoT Management is a web application designed to manage and monitor smart home devices such as lights, thermostats, robots, and smart plugs. It provides an intuitive interface for users to control their devices, view energy consumption statistics, and set schedules for automated operations.

## Features

- **User Authentication**: Secure login and registration system.
- **Device Management**: Add, update, and control smart devices like lights, thermostats, robots, and smart plugs.
- **Energy Monitoring**: View energy consumption statistics and set energy-saving goals.
- **Scheduling**: Schedule operations for devices like thermostats.
- **Manager Mode**: Special privileges for managers to add or remove users and devices.
- **Responsive Design**: Optimised for both desktop and mobile devices.
- **Data Visualisation**: Interactive charts for energy usage and device statistics.

## Technologies Used

- **Frontend**: React, Recharts, RC-Slider
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS with custom components
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChronicleWolfVR/SmartHome-IoT-Management.git
   cd SmartHome-IoT-Management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Login/Sign Up**: Start by creating an account or logging in.
2. **Navigate Tabs**: Use the tabs to switch between Overview, Thermostat, Lights, Smart Plugs, and Robots.
3. **Control Devices**: Toggle device states, adjust settings, and view energy usage.
4. **Manager Mode**: Switch to manager mode to add/remove users and devices.
5. **Share & Help**: Share your stats or access the help section for troubleshooting.

## Folder Structure

```
src/
├── components/
│   ├── HomePage/
│   ├── StartPage/
│   ├── Button/
│   ├── Title/
├── context/
├── index.jsx
├── index.css
routes/
models/
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact:

- **Email**: vr2021@hw.ac.uk
- **GitHub**: [GitHub Repository](https://github.com/ChronicleWolfVR/SmartHome-IoT-Management)

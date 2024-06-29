## <a href="https://stpk-worldwise.netlify.app/">WorldWise - A React app to helps you track your travels and create a visual record of your adventures</a>

## Overview

WorldWise helps you track your travels and create a visual record of your adventures. It allows you to add cities to your list and view them on a world map, as well as view information about each city.

It is built using [React.js](https://react.dev/), [React Router](https://reactrouter.com/), [React DatePicker](https://reactdatepicker.com/), [React Leaflet](https://react-leaflet.js.org/) and [BigDataCloud Client Side Reverse Geocoding to City API](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api).

This application is currently in development, but it is already a useful tool for travelers. It is easy to use and has a clean and modern user interface.

**Features**

- **Pages:** WorldWise has 5 pages: homepage, pricing, product, login, and app.
<!--TODO - **Responsive design** WorldWise has a responsive design that adapts to different screen sizes and devices. -->
- **Interactive world map:** WorldWise displays a world map with markers for all of the cities that the user has added to their list.
- **City list:** WorldWise displays a list of all of the cities that the user has added to their list. The list includes the city name, country flag, and date of visit.
- **City form:** When the user clicks on a city on the map or in the list, WorldWise displays a form with information about the city, including the city name, country flag, date of visit, and notes about the trip.
- **Add city:** The user can add a city to their list by filling out the city form and clicking the "ADD" button. A marker will then appear on the map for the new city.
- **Remove city:** The user can remove a city from their list by clicking the "&times;" button next to the city in the list. The marker for the city will then be removed from the map.
<!--TODO - **Edit and update city** The user can edit and update the information for existing cities in the list. To do this, simply click on the city in the list and then click the "EDIT" button. -->
- **Current user geolocation:** The user can click the "USE YOUR POSITION" button to navigate the map to their current user's geolocation.
<!--TODO - **Local storage:** The list of cities is persisted in local storage, so that the user's list is preserved even if they close the browser or navigate to a different page. -->
- **Login and logout functionality:** WorldWise allows users to log in and out of their accounts.
- **Tab component:** WorldWise has a tab component that displays a list of cities and correspond countries that user added. This allows users to quickly switch between different views of their list.

## Screenshots

![home-page](public/screenshots/home-page.webp)
![pricing-page](public/screenshots/pricing-page.webp)
![product-page](public/screenshots/product-page.webp)
![login-page](public/screenshots/login-page.webp)
![app-page](public/screenshots/app-page.webp)
![add-city](public/screenshots/add-city.webp)
![display-cities](public/screenshots/display-cities.webp)
![display-countries](public/screenshots/display-countries.webp)
![city-detail](public/screenshots/city-detail.webp)

## Usage

WorldWise is a web application that helps you track your travels and create a visual record of your adventures. To use WorldWise, simply log in and start adding cities to your list.

**To add a city to your list:**

- Click on the position on the map where you want to add a city.
- The city form will be displayed automatically.
- You can fill out the city form, including the city name, country flag, date of visit, and notes about your trip. Alternatively, you can click on the "ADD" button without filling out the form to simply add a marker to the map.
- Click the "ADD" button.
- A marker will then appear on the map for the new city.

**To remove a city from your list:**

- Click on the "&times;" button next to the city in the list.
- The marker for the city will then be removed from the map.

<!--TODO **To edit or update information for a city:**

- Click on the city in the list or on the map.
- The city form will be displayed with information about the city, including the city name, country flag, date of visit, and notes about your trip.
- Make the desired changes to the form.
- Click the "UPDATE" button. -->

**To view information about a city:**

- Click on the city name in the list or on the map.
- A form will be displayed with information about the city, including the city name, country flag, date of visit, and notes about your trip.

**To navigate the map to a city:**

- Click on the city name in the list or on the map.
- The map will navigate to the corresponding position. You can also zoom and pan the map to navigate to a city.

**To use the login and logout functionality:**

## Acknowledgments

This project was created as part of [The Ultimate React Course 2023: React, Redux & More](https://www.udemy.com/course/the-ultimate-react-course/) by [Jonas Schmedtmann](https://github.com/jonasschmedtmann). Special thanks to him for providing the project structure and design.

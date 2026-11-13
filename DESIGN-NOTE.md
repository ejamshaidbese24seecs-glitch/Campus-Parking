# CampusPark — Wireframe and Design Note

**Idea 17: Campus Parking Availability Planner**

## User and problem
Students and university staff need a quick way to compare parking areas, see sample free-space counts and estimate the cost of a planned stay.

## Core workflow
Open the dashboard → search/filter parking zones → choose a zone and vehicle type → enter duration → check availability and view estimated cost.

## WDLC stages
- **Planning:** define the target users and parking discovery problem.
- **Analysis:** identify required data (zone name, location, capacity, occupied spaces and hourly rate).
- **Design:** create dashboard, searchable zone cards and a labeled planning form.
- **Development:** implement semantic HTML, responsive CSS and vanilla JavaScript.
- **Testing:** verify filtering, calculations, form validation, empty results and responsive behavior.
- **Deployment/maintenance:** publish the static site and update sample records as requirements change.

## Client/server boundary
Assignment 1 has no backend. The browser loads the static HTML/CSS/JS files. JavaScript stores six sample records in an array, filters them and calculates estimates locally. A future server version could store authoritative occupancy and reservations; this prototype must not be represented as live availability.

## Accessibility and responsive design
Use semantic landmarks, a single main heading, explicit form labels, native input types, visible focus styles and live result messages. CSS Grid/Flexbox and two media-query breakpoints adapt the page for desktop, tablet and mobile.

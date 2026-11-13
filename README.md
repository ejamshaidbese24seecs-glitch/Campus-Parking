# CampusPark — Campus Parking Availability Planner

**Course:** CS 344 Web Engineering, Fall 2026  
**Assignment:** 1 — Client-side web application  
**Assigned idea:** 17 — Campus Parking Availability Planner  
**Additional instructor rule/data variant:** Not provided in the information shared so far. Confirm this with your instructor before final submission.

## User and problem
The intended users are students and staff who want to compare campus parking zones before arriving. The prototype presents sample occupancy data and lets a visitor explore zones and plan an estimated parking stay.

## Current project status
This prototype implements two interactions in `app.js`:
1. `filterZones()` — combine the text search and availability filter.
2. `handlePlanSubmit(event)` — validate inputs, check availability and calculate the estimated fee.

Review and understand the HTML/CSS/JavaScript yourself. The assignment brief says not to submit generated full-site code; use this scaffold as a starting point and make the implementation your own.

## Run locally
1. Extract the ZIP.
2. Open the `CampusPark_Assignment1_Starter` folder.
3. Double-click `index.html`, or open it in VS Code and use a local preview extension.
4. No backend, package installation or credentials are required.

## Sample records
Six demonstration zones are defined in `app.js`: Main Gate Parking, Central Library, Engineering Block, Sports Complex, Administration Block and Hostel Parking. These are fictional sample records, not verified campus data.

## Technologies and course concepts
- Semantic HTML landmarks, headings, labels, form controls and native validation.
- CSS variables, selectors, box sizing, Grid, Flexbox and tablet/mobile media queries.
- JavaScript variables, arrays, objects, functions, conditionals, array methods and DOM events.
- Client-side rendering and live status messages.

## WDLC design note
1. **Planning/analysis:** identify students and staff as users; their problem is finding a suitable parking area and estimating a fee.
2. **Design:** use a dashboard, zone list, filters and a short planning form; prioritize clear labels and mobile layout.
3. **Implementation:** HTML defines content, CSS handles presentation and responsive layout, and JavaScript renders and filters sample data.
4. **Testing:** test search matches/no matches, each availability filter, blank fields, invalid duration, full zones and valid estimates.
5. **Deployment/maintenance:** publish the static files through GitHub Pages after testing; revise sample data and features when requirements change.

## Client versus server
For Assignment 1, all work runs in the browser: HTML/CSS render the interface and JavaScript processes the in-memory sample array. There is no server, database, authentication or real-time sensor feed. A later assignment may move persistent parking records and validation to a server.

## Wireframe
```text
+------------------------------------------------------+
| CampusPark                 Dashboard Zones Plan      |
+------------------------------------------------------+
| FIND A SPOT. GET ON WITH YOUR DAY. | DEMO STATUS     |
| [Explore parking]                  | Available count |
+------------------------------------------------------+
| Total spaces      Available       Occupied           |
+------------------------------------------------------+
| PARKING ZONES                                         |
| [Search zones................] [Availability v]      |
| +----------------+ +----------------+ +-------------+ |
| | Main Gate      | | Library        | | Engineering | |
| | Available      | | Full           | | Available   | |
| +----------------+ +----------------+ +-------------+ |
+------------------------------------------------------+
| CHECK A PARKING ZONE             | PLANNER FORM       |
| Explanation                      | Name               |
|                                  | Vehicle type       |
|                                  | Zone               |
|                                  | Duration           |
|                                  | [Check estimate]   |
|                                  | Result             |
+------------------------------------------------------+
| Footer / prototype notice                              |
+------------------------------------------------------+
```

## Testing checklist
- [ ] Search for an existing zone.
- [ ] Search for a name that does not exist.
- [ ] Filter zones with available spaces.
- [ ] Filter full zones.
- [ ] Submit the form with missing values.
- [ ] Enter a duration below 1 or above 12.
- [ ] Check a full parking zone.
- [ ] Check an available zone and verify the fee.
- [ ] Test at mobile, tablet and desktop widths.

## AI assistance and attribution
AI assistance was used to prepare this starter scaffold and documentation. Before submission, disclose assistance in the form required by your instructor, understand and revise the code, and cite any external assets or reused code. This scaffold uses no external images, libraries or frameworks.

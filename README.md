# My JavaScript Calculator

## Introduction

For this project, I aimed to create a fully functioning calculator by combining all the skills I have learnt so far in HTML, SCSS/CSS and JavaScript. The calculator supports the following operations: [+, -, /, *, =, ^] as well as Pi, negative numbers and decimals.

## Implementation Breakdown

Before building my calculator, I drafted the below implementation outline:

1. Create the base HTML elements, including the main output container, buttons and the general layout.
2. Use SCSS styling to add colour, button styling, element sizing and calculator layout using flexbox/grid.
3. Create a JavaScript file to handle the general flow of the calculator.
4. Add DOM manipulation to output calculations to the screen.
5. Utilise event listeners to add functionality and track each button press.
6. Implement functions for some operations such as equals and clear.
7. If time allows, additional operators can be added after completing the MVP.

## Inspiration (Android 12 Calculator)

<img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22835822/Screen_Shot_2021_09_08_at_4.58.56_PM.png" alt="Android 12 Calculator" title="Calculator Inspiration" width="450"/>

## Requirements

### MVP

-   [x] Number keys 0-9
-   [x] Operator keys (+, -, &divide;, &times;, =)
-   [x] Decimals support
-   [x] Display rendering the current calculation
-   [x] Does not use the eval() function

### Extra Features

-   [x] Supports negative numbers
-   [x] Output also logs the previous calculation at the top
-   [x] Power operator ^
-   [x] Pi button &pi;

## Future of the Project

If I had more time to develop this program, I would like to implement support for order of operations as well as add bracket keys for further complex functionality.

Ideally, I would have also added more responsiveness to each button in the form of visual feedback to the user. Currently the calculator does not handle scientific notation correctly and I would likely need to overhaul my evaluation function to support this.

Overall, I am happy with the state of my JS web calculator given the one week timeframe we were allotted to complete it. It supports a decent number of operations, negatives and has also checks to prevent incorrect inputs by the user.

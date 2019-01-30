# The Game of Life
Coding task for BBC Software Engineering Scheme.

### Running the project 
1. Clone/Download the repository
2. Open `index.html` using any modern browser (Chrome, Firefox, etc.)

### Project description
This project is an implementation of "The Game of Life" rules using HTML, CSS, JavaScript and Bootstrap 4. By default, the website loads with a game board of size 600px by 600px with letters "BBC" formed with cells. Black squares represent live cells and white squares represent empty space. Displaying dead cells can be turned on by pressing Dead Cells button and choosing a different colour than white. User can click on the game board to create/delete cells.

### Controlling the game board
User can control the game board using the blue set of buttons:
- Start - starts/resumes "The Game of Life" interval.
- Stop - stops the interval.
- Step - single tick of an interval - next generation. Can be used with the interval running in the background.
- Reset - cleans the game board and resets the generation count.
- Random - fills the game boards with cells randomly (50% probability that an empty field will become a cell).

### Customization buttons
##### Customize properties of the game board:
- Set Size - sets the size of the side of the game board in pixels. Minumum size is 50px and maximum size depends on user's viewport width.
- Set Cell Size - sets the size of the side of all cells in pixels. Minumum size is 2px and maximum size depends on user's current game board width.
- Set Interval - sets the interval's delay in milliseconds - how quickly new generations are being generated. Minumum delay is 1 millisecond and maximum delay is 1 minute (60000 milliseconds). Setting a new delay when an interval is already running will cause the old interval to stop and a new interval with updated delay will start.

##### Customize colors:
- Cells - sets the color of live cells
- Grid - sets the color of the grid
- Dead Cells - sets the color of dead cells

## Author
Bartlomiej Kloza



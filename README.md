# who-is-cramming

## Why:
- The ultimate goal for this project is to help identify trends in when people study relative to the test time.

## What:
- This project grabs the usernames of Quizlet users who have studied a specified set and keeps track of when they studied it (data is collected once every hour).

## How:
1. Add a JSON object containing the `time` of the test (milliseconds since unix epoch) and an array of set `ids` to the array in `sets.js`.
	- There is already an example in sets.js.
	- Ignore the small bit of code, that is just so that both the .js file and .html file can easily access the data.
2. Run collect.js with `node collect.js`.
	- If you keep it open the data will update once an hour. You may also open it at custom intervals or, more conveniently, change the interval time in the file.
3. Open graph.html.
	- You will be prompted to enter the set ID of the set which you would like to examine the data for.
	- You can find the set IDs in sets.js or by viewing the response when you provide an incorrect ID.
	- Y axis is the total number of studiers, X axis is the number of hours since the first studier or when collect.js was initially ran.
	- Hover over a column with your cursor to see the Quizlet usernames of the new studiers.

## Limitations/Future Additions:
- [ ] The set must be public, in the future I may add the ability to sign in with Quizlet & access private sets.
- [ ] Although all the necessary data is provided, currently the X axis on the graph indicates the # of hours since the first studier, not the # of hours away from the test.
- [ ] The ability to view all/multiple sets at once in graph.html
- [ ] Some sloppy/inefficient JS in graph.html (mostly because I didn't feel like properly reading the plotly.js documentation). If you would like to contribute, this is a good place to get started.
- [x] Instead of adding sets to sets.js, add tests which can have multiple sets.
- [ ] Automatically find the line of best fit.
- [ ] (Maybe) build a custom graph instead of using plotly.js because we’re just using such a simple feature.

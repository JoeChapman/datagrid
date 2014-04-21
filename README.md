datagrid
========

### Sorting
Data is currently sorted via the Spreadsheet API. Unfortunately it doesn't give the user any control over the detail of comparison between entries. With more time, I would have created a collection of models on the client that could have been sorted in finer detail.

Sorting is refreshed on each page load, undesirable, would refactor to persist sort id between loads.

### Loading
Each time the 'Preview' page is loaded a new API call is made, updating the client from the data, which is unnecessary, it should be refactored so the data is only loaded if the data has changed.

A loading gif would be a useful addition to the UI.

### Updating
Ideally updating of the UI would occur as and when the data is updated, which might require some polling of the spreadsheet API, and possibly a socket between the client and server.

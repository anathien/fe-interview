# Assessment notes

## General
I have opted for not using Redux or friends for this task, as my original plan was to integrate GraphQL into the project and do all queries and mutations via Relay. I ended up not having time for this in the end and thus left the endpoint queries in a utils file instead. This file would be relatively easy to convert to GraphQL endpoints once the server is set up.

## Testing
For testing, I prefer to unit test the logic portion (utils and calculations) of the code and functional test the UI itself (via cucumber for example). I don’t think any logic part of this assessment warrants a test case, as most changes are made on the functional side (initial load and two button clicks). As for functional testing, I didn’t end up adding cucumber to the project for lack of time. These would be the test cases I would consider at first:
 * Loading the page shows the TabControl, with the Bills view selected
 * When clicking on the Bills tab, nothing happens, still Bills is selected
 * When clicking on the Potential bills tab, the content changes to the Potential bills view
 * For an empty database, Bills tab renders, but there are no items to show
 * For an empty database, Potential bills tab renders, but there are no items to show
 * For a valid database, the correct number of Bills are shown
 * For a valid database, the correct number of Potential bills are shown
 * Bill items are rendered correctly (correct name & number of transactions, the button shows up with “Remove bill” as text)
 * Potential bill items are rendered correctly (correct name & number of transactions, the button shows up with “Add as bill” as text)
 * When clicking on a Bill, the transaction list shows up and has the correct number of transactions
 * When clicking on two Bills, both transaction list show up and have the correct number of transactions
 * When clicking on a Bill for the second time, the transaction list disappears
 * When clicking on a Potential bill, the transaction list shows up and has the correct number of transactions
 * When clicking on two Potential bills, both transaction list show up and have the correct number of transactions
 * When clicking on a Potential bill for the second time, the transaction list disappears
 * The transaction list for a Bill item shows the correct transaction details (date & amount)
 * The transaction list for a Potential bill item shows the correct transaction details (date & amount)
 * When clicking on the “Remove bill” button on the Bill view, the transaction disappears from the list, but can be found in the Potential bills list
 * When clicking on the “Add as bill” button on the Potential bill view, the transaction disappears from the list, but can be found in the Bills list
 * When there is only one item on the Bills list, clicking on the “Remove bill” button produces an empty tab, but the item can be found in the Potential bills list
 * When there is only one item on the Potential bills list, clicking on the “Add as bill” button produces an empty tab, but the item can be found in the Bills list

Most of these test cases are duplicated for Bills and Potential bills. It looks redundant from an implementation point of view, but makes sense from a functional testing one, since the tests cannot rely on the knowledge of components being shared between the two views. These could be implemented without much code duplication by using parameterized test cases.

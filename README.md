# BotSheet

A Google Sheet utilizing ProfitView Trading Bots

## Installation

In order to use this code you must [Sign-up with ProfitView](https://profitview.net/register) and choose at least the Hobbyist plan.  This will give access to the Trading Bots tab.

1. Clone this repo into an appropriate directory
2. Log in to [ProfitView](https://profitview.net) and go to the Trading Bots tab
3. Open [`BotSheet.py`](BotSheet.py) in an editor and copy it into your chosen ProfitView Trading Bots editor entirely replacing the code there.
   1. Start the Bot (it will not store any data since you haven't yet chosen any symbols)
   2. Click the "lightning" icon and copy the URL for `latest_trades`. Paste it somewhere and copy the "token" (the text between `trading/bot/` and `/latest_trades`).
4. Open [Google Sheets](https://docs.google.com/spreadsheets/)
   1. Choose "Blank"
   2. File>Import>Upload>Browse and choose [`BotSheet.xlsx`](BotSheet.xlsx) from the `botsheet` directory you just cloned.
   3. Paste your token from above into cell `H2`
   4. **NOTE** you might have to create the buttons (they may not appear on upload of the XLSX file)
      1. Insert>Drawing
      2. Shape toolbar item and choose rounded rectangle
      3. Create a button-like rectangle and add text e.g. "Clear" and choose colors etc
      4. Save and Close
      5. Right-click and position the button
      6. Repeat for other buttons
5. In the sheet's menus go to Extensions>Apps Script
   1. Open and copy all of [`botsheet.gs`](botsheet.gs) from the (recently cloned) `botsheet` directory and paste it into the Apps Script code window so that it replaces any text there.
   2. Replace "Untitled project" with "BotSheet" (or similar) for the name of the project.
   3. Click the save icon.
6. Back in the Google Sheet
   1. Right-click on the Clear "button" 
   2. Left-click on the triple-dot and choose Assign Script.  Choose `clearData`.  Similarly for the "Get Trades" button choose `getTrades`.
7. Finally, click the lightning symbol again and now under Market Streams, in the BitMEX section (or that of the exchange you are using) choose some symbols.
8. Stop and re-deploy your bot - then click Start Bot.

## Using BotSheet

Wait a few minutes after the bot has been started - depending on market activity for the symbols you choose.

### Get latest trades

Click "Get Trades" - you should see the list of most recent trades under the `src` (Source - i.e. exchange), `sym` (Symbol or coin), `price`, `side` and `time`.  Time is in milliseconds since 1970.  A column `date-time` is added using Sheets [`EPOCHTODATE()`](https://support.google.com/docs/answer/13193461?hl=en) function.

### Restrict by criteria

On the right side near the **Get Trades** button entries `src`, `sym` and `side` allow the output to be restricted to whatever is placed below these cells.  E.g. change `J7` to `ETHUSD` or similar.

By default (empty cells) there is no restriction.

### Specify number of lines

To the right of `side` you see `num`.  Place the number of lines of output you want below this.  The default is 10.

### Clear data

The Clear button will delete all accumulated data and clear the screen.
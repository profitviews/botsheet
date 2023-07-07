# BotSheet

A Google Sheet utilizing ProfitView Trading Bots

## Installation and Use

In order to use this code you must [Sign-up with ProfitView](https://profitview.net/register) and choose at least the Hobbyist plan.  This will give access to the Trading Bots tab.

1. Log in to [ProfitView](https://profitview.net) and go to the Trading Bots tab
2. Open [`BotSheet.py`](BotSheet.py) in an editor and copy it into your chosen ProfitView Trading Bots editor entirely replacing the code there.
   1. Start the Bot (it will not store any data since you haven't yet chosen any symbols)
   2. Click the "lightning" icon and copy the URL for `latest_trades`. Paste it somewhere and copy the "token" (the text between `trading/bot/` and `/latest_trades`).
3. Open [Google Sheets](https://docs.google.com/spreadsheets/)
   1. Choose "Blank"
   2. File>Import>Upload>Browse and choose [`BotSheet.xlsx`](BotSheet.xlsx) from the `botsheet` directory you just cloned.
   3. Paste your token from above into cell `H2`
4. In the sheet's menus go to Extensions>Apps Script
   1. Open and copy all of [`botsheet.gs`](botsheet.gs) from the (recently cloned) `botsheet` directory and paste it into the Apps Script code window so that it replaces any text there.
   2. Replace "Untitled project" with "BotSheet" (or similar) for the name of the project.
   3. Click the save icon.
5. Back in the Google Sheet
   1. Right-click on the Clear "button" 
   2. Left-click on the triple-dot and choose Assign Script.  Choose `clearData`.  Similarly for the "Get Trades" button choose `getTrades`.
6. Finally, click the lightning symbol again and now under Market Streams, in the BitMEX section (or that of the exchange you are using) choose some symbols.
7. Stop and re-deploy your bot - then click Start Bot.
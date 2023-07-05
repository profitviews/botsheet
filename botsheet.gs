const TOKEN = '6vwB3rsK59SxL1Mt0rkK';

function clearTrades() {
  var bs = new BotSheet(TOKEN);
  bs.clearTrades();
}

function getTrades() {
  var bs = new BotSheet(TOKEN);
  bs.getTrades();
}

class BotSheet {
  constructor(token) {
    if (token===undefined) 
      this.token = PropertiesService.getScriptProperties().getProperty("TOKEN");
    else {
      this.token = token;
      PropertiesService.getScriptProperties().setProperty("TOKEN", token);
    }
  }

  clearTrades() {
    this.clearRange(2, 1, 10, 5);
  }

  getTrades() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var range = sheet.getRange('A2:E11');
    SpreadsheetApp.setActiveRange(range);
    range.setValues(this.get_profitview('latest_trades'));
  }

  get_profitview(action) {

    var payload = this.token + '/' + action;
    var url = "https://profitview.net/trading/bot/" + payload;

    try {
      var fetched = UrlFetchApp.fetch(url);
      var response = JSON.parse(fetched);      
    }
    catch(error) { return error}
    return response.data;
  }

  clearRange(row, column, width, height) {
    var sheet = SpreadsheetApp.getActive().getActiveSheet();
    var range = sheet.getRange(row, column, width, height);
    range.clearContent();
    return "Success";
  }
};
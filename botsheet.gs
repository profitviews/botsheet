const TOKEN = '6vwB3rsK59SxL1Mt0rkK';

function test() {
  var bs = new BotSheet(TOKEN);
  bs.getTrades();
}

function getTrades() {
  var bs = new BotSheet(TOKEN);
  bs.getTrades();
}

function clearData() {
  new BotSheet().clearData();
}

class BotSheet {
  constructor(token) {
    this.ps = PropertiesService.getScriptProperties();
    if (token===undefined) 
      this.token = this.ps.getProperty("TOKEN");
    else {
      this.token = token;
      this.ps.setProperty("TOKEN", token);
    }
    this.lines = +this.ps.getProperty("LINES");
    this.ssheet = SpreadsheetApp.getActiveSpreadsheet();
    this.readCells();
  }

  readCells() {
    this.cells = this.ssheet.getRange('I6:L7').getValues();
  }

  getTrades() {
    var payload = 'latest_trades';
    for (var i = 0; i < this.cells[0].length; i = i + 1) {
      payload = payload + (i ? '&':'?') + this.cells[0][i] + '=' + this.cells[1][i];
    }
    var data = this.get_profitview(payload);
    if (data.length == 0) return;
    var sheet = this.ssheet.getSheets()[0];
    var range = sheet.getRange(2, 1, data.length, 5);
    SpreadsheetApp.setActiveRange(range);
    range.setValues(data);
    this.lines = data.length;
    this.ps.setProperty("LINES", data.length);
  }

  clearData() {
    this.get_profitview('reset_trades');
    this.clearRange(2, 1, this.lines || 10, 5)
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

  clearRange(row, column, height, width) {
    var sheet = SpreadsheetApp.getActive().getActiveSheet();
    var range = sheet.getRange(row, column, height, width);
    range.clearContent();
    return "Success";
  }

};
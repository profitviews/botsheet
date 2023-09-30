function get_button() {
  new ControlBotSheet().get_button();
}

function post_button() {
  new ControlBotSheet().post_button();
}

function toggle_bot() {
  new ControlBotSheet().toggle_bot();
}

const BOT_URL = "https://profitview.net/trading/bot/";

class ControlBotSheet {
  constructor() {
    /* Use `ps` to store persistent data */
    this.ps = PropertiesService.getScriptProperties();


    this.book = SpreadsheetApp.getActiveSpreadsheet();
    this.ssheet = SpreadsheetApp.getActiveSheet();

    /* Assumes the ProfitView token for this Bot is in A2               */
    this.token = this.ssheet.getRange('A2').getValue();
    /* Values to pass are in two columns: parameters and values.
       The number of rows is in B4                                      */
    this.param_count = this.ssheet.getRange('B4').getValue();

    /* Assumes there's a set of parameters named from A5 and down 
       with values in B5 and down                                       */
    this.params = {};
    var param_rows = this.ssheet.getRange(5, 1, this.param_count, 2).getValues();
    // Logger.log("Len: ", param_rows.length)
    for (var i = 0; i < param_rows.length; i++) {
      var key = param_rows[i][0];
      this.params[key] = param_rows[i][1];
    }
  }

  get_button() {
    this.get_profitview("button", this.params);
  }

  post_button() {
    // For this example: (adapt for practical use)
    // - post the parameter list from the sheet
    // - write out the parameter list returned
    var data = this.post_profitview("button", this.params);
    this.output_data(data);
  }

  toggle_bot() {
    this.get_profitview("toggle_bot", {});
  }

  get_profitview(action, data) {
    const values = Object.values(data);
    const keys = Object.keys(data);
    var payload = this.token + '/' + action;
    for (var i = 0; i < values.length; i = i + 1) {
      payload = payload + (i ? '&':'?') + keys[i] + '=' + values[i];
    }
    var url = BOT_URL + payload;
    var fetched = UrlFetchApp.fetch(url);
    var response = JSON.parse(fetched);      
    return response.data;
  }

  post_profitview(action, data) {
    var request = {
      'method' : 'post',
      'payload' : data
    };
    var url = BOT_URL + this.token + '/' + action;
    var fetched = UrlFetchApp.fetch(url, request);
    var response = JSON.parse(fetched);      
    return response.data;
  }

  output_data(data) {
    Logger.log(data);
    if (data.length == 0) return;
    var sheet = this.book.getSheets()[1]; // Output in the 2nd sheet
    // 2nd row (after titles) 1st collumn
    var range = sheet.getRange(2, 1, data.length, 2);
    sheet.setActiveRange(range);
    range.setValues(data);
  }

};
from profitview import Link, http, logger
import sqlite3


class Trading(Link):
    def __init__(self):
        super().__init__()
        self.con = sqlite3.connect("trading.db", check_same_thread=False)
		logger.info("Created/conected sqlite db")
        self.init_trading_db()
        
    def init_trading_db(self):
        self.cur = self.con.cursor()
        self.cur.execute("CREATE TABLE IF NOT EXISTS trades(src, sym, price, side, time)")        
	
    def __del__(self):
        super().__del__()
        self.con.close()

    def trade_update(self, src, sym, data):
        self.cur.execute("""
            INSERT INTO trades VALUES
            (?, ?, ?, ?, ?)
            """, (src, sym, data['price'], data['side'], data['time']))
        self.con.commit()

    @http.route
    def get_latest_trades(self, data):
		where_clause = "where"
		for i, (k, v) in enumerate(list(data.items())[:-1]):
			if v: where_clause += (" and " if i else " ") + f"{k} = '{v}'"
		statement = "SELECT * from trades " + where_clause + f" order by time desc limit {data['num'] or 10}"
        trades_cur = self.con.cursor()
        trades_cur.execute(statement)
        return trades_cur.fetchall()

    @http.route
    def get_reset_trades(self, data):
		logger.info("Removing stored trades from the database")
        self.con.cursor().execute("DROP TABLE IF EXISTS trades;")
        self.con.commit()
        self.init_trading_db()

from profitview import Link, http, logger
import sqlite3


class Trading(Link):
    def __init__(self):
        super().__init__()
		logger.info("Completed super init")
        self.con = sqlite3.connect("trading.db", check_same_thread=False)
		logger.info("Created/conected sqlite db")
        self.init_trading_db()
        
    def init_trading_db(self):
        self.cur = self.con.cursor()
		logger.info("Created db cursor")
        self.cur.execute("CREATE TABLE IF NOT EXISTS trades(exchange, symbol, price, side, time)")        
        logger.info("Created db table")
	
    def __del__(self):
        super().__del__()
        self.con.close()

    def trade_update(self, src, sym, data):
        """Event: receive market trades from subscribed symbols"""
        logger.info(f"Trade: {(src, sym, data['price'], data['side'])=}")
        self.cur.execute("""
            INSERT INTO trades VALUES
            (?, ?, ?, ?, ?)
            """, (src, sym, data['price'], data['side'], data['time']))
        self.con.commit()
        logger.info(f"Trade on {sym} recorded")

    @http.route
    def get_latest_trades(self, data):
		logger.info("Getting latest trades")
        example_cur = self.con.cursor()
        example_cur.execute("SELECT * from trades order by time desc limit 10")
        return example_cur.fetchall()

    @http.route
    def get_no_acc_trades(self, data):
		logger.info("Getting the total number of trades stored")
        example_cur = self.con.cursor()
        example_cur.execute("SELECT COUNT(*) from trades")
        return example_cur.fetchone()

    @http.route
    def get_reset_trades(self, data):
		logger.info("Removing stored trades from the database")
        self.con.cursor().execute("DELETE FROM trades;")
        self.con.commit()
        self.init_trading_db()

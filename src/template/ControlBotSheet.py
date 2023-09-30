# For use in a ProfitView Bot

from profitview import Link, http, logger


class Trading(Link):
	# Example parameters from 
    # github.com/profitviews/bitmex-algo-academy/blob/main/src/grid-bots/multi-vendor-multi-contract.py
	ACTIVE = False
	UPDATE_SECONDS = 60
	MULTIPLIER = 1
	SHUT_IT_DOWN = False
	GRACEFUL_SHUTDOWN = True
	GRID_BIDS = (40, 30, 20)
	GRID_ASKS = (60, 70, 80)
	SRC = 'bitmex'
	
    @http.route
    def get_button(self, data):
		logger.info(("get_button", data))
		return "get_button"

    @http.route
    def post_button(self, data):
		logger.info("post_button")
		logger.info(f"UPDATE_SECONDS - before: {self.UPDATE_SECONDS}")
		logger.info(f"GRID_BIDS - before: {self.GRID_BIDS}")
		output = []
		for (p, v) in data.items():
			v = v.strip()
			if v[0]+v[-1] == '()':  # eg GRID_BIDS int tuple as string
				v = tuple(int(c.strip()) for c in v[1:-1].split(','))
			setattr(self, p, v)  # No validation!
			output.append([p, v])			
		logger.info(f"UPDATE_SECONDS - after: {self.UPDATE_SECONDS}")
		logger.info(f"GRID_BIDS - after: {self.GRID_BIDS}")
		return output  # Just returning what's passed as an example

    @http.route
    def get_toggle_bot(self, data):  # Possibly toggle order entry
		self.ACTIVE = not self.ACTIVE
		logger.info("Active" if self.ACTIVE else "Inactive")
		return "get_toggle_bot"

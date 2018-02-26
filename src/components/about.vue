<template>
  <div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
   <div class="pure-u-1 pure-u-md-1-8"></div>
   <div class="pure-u-1 pure-u-md-3-4">
   <h2 class="content-subhead is-center">Realtime Cryptocurrency Updates</h2>
<div>
        <table class="table table-hover">
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Price (USD)</td>
            <td>1H</td>
            <td>1D</td>
            <td>1W</td>
            <td>Market Cap (USD)</td>
			</tr>
        </thead>
        <tbody>
          <tr v-cloak v-for="coin in coins">
            <td>{{ coin.rank }}</td>
            <td><img v-bind:src="getCoinImage(coin.symbol)" style="height:25px;width:25px;"> {{ coin.name }}</td>
            <td>{{ coin.symbol }}</td>
            <td>{{ coin.price_usd | currency }}</td>
            <td v-bind:style="getColor(coin.percent_change_1h)">
              <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
            </td>
            <td v-bind:style="getColor(coin.percent_change_24h)">
              <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
            </td>
            <td v-bind:style="getColor(coin.percent_change_7d)">
              <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
            </td>
            <td>{{ coin.market_cap_usd | currency }}</td>
          </tr>
        </tbody>
      </table>
</div>
<div style="margin-bottom:10px;">
<h4 class="content-subhead is-center">Market capitalisation by currency</h4>
<pie-chart :data="dataType"></pie-chart>
</div>
     </div>
     <div class="pure-u-1 pure-u-md-1-8"></div>   
   </div>   
 </div>
</template>

<script>
import axios from 'axios'
// The API we're using for grabbing metadata about each cryptocurrency
// (including logo images). The service can be found at:
// https://www.cryptocompare.com/api/
let CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
let CRYPTOCOMPARE_URI = "https://www.cryptocompare.com";

// The API we're using for grabbing cryptocurrency prices.  The service can be
// found at: https://coinmarketcap.com/api/
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

// The amount of milliseconds (ms) after which we should update our currency
// charts.
let UPDATE_INTERVAL = 60 * 1000;

export default{
data(){
return {
coins: [],
coinData: {},
dataType: [
["Bitcoin",44],
["Ethereum",31],
["Ripple",12],
["Litecoin",2],
["Ethereum Classic",2],
["Nem",1.7],
["Dash",1.3],
["All Others",6]
]
}
},
methods: {
    /**
     * Load up all cryptocurrency data.  This data is used to find what logos
     * each currency has, so we can display things in a friendly way.
     */
    getCoinData: function() {
      let self = this;

      axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },

    /**
     * Get the top 10 cryptocurrencies by value.  This data is refreshed each 5
     * minutes by the backing API service.
     */
    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
        .then((resp) => {
          this.coins = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /**
     * Given a cryptocurrency ticket symbol, return the currency's logo
     * image.
     */
    getCoinImage: function(symbol) {

      // These two symbols don't match up across API services. I'm manually
      // replacing these here so I can find the correct image for the currency.
      //
      // In the future, it would be nice to find a more generic way of searching
      // for currency images
      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      return CRYPTOCOMPARE_URI + this.coinData[symbol].ImageUrl;
    },

    /**
     * Return a CSS color (either red or green) depending on whether or
     * not the value passed in is negative or positive.
     */
    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    }
},
  /**
   * Using this lifecycle hook, we'll populate all of the cryptocurrency data as
   * soon as the page is loaded a single time.
   */
created: function () {
    this.getCoinData();
  }
}
</script>
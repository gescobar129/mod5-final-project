require 'rest-client'
require 'dotenv'
require 'uri'
require 'net/http'

puts 'Deleting existing data...'
Coin.destroy_all
User.destroy_all

user1 = User.create(name: "gaida", password: "test", email: "test@gmail.com", state: "NY")

url = URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
request = Net::HTTP::Get.new(url)
request["X-CMC_PRO_API_KEY"] = ENV["CMC_SECRET_KEY"]
request["Accept"] = 'application/json'
request["Cache-Control"] = 'no-cache'
request["Host"] = 'pro-api.coinmarketcap.com'
request["Accept-Encoding"] = 'application/json'
request["Connection"] = 'keep-alive'
request["cache-control"] = 'no-cache'

response = http.request(request)
latest_listings = JSON.parse(response.body)["data"]

symbols = ''

# mapping through array of coins(latest_listing) and creating a coin with the attributes below
latest_listings.map do |dataInfo|
  symbols = symbols + "," + dataInfo["symbol"]

  Coin.create(
    name: dataInfo["name"],
    symbol: dataInfo["symbol"],
    rank: dataInfo["cmc_rank"],
    price: dataInfo["quote"]["USD"]["price"],
    circulating_supply: dataInfo["circulating_supply"],
    percent_change_1h: dataInfo["quote"]["USD"]["percent_change_1h"],
    percent_change_24h: dataInfo["quote"]["USD"]["percent_change_24h"],
    percent_change_7d: dataInfo["quote"]["USD"]["percent_change_7d"],
    volume_24h: dataInfo["quote"]["USD"]["volume_24h"],
    market_cap: dataInfo["quote"]["USD"]["market_cap"],
  )
end

puts 'first checkpoint'
symbols_array = symbols.split(",")
symbols_string = symbols_array.drop(1).join(',')
puts symbols_string

url_test = URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XTZ,XLM,LEO,TRX,ADA,XMR,ATOM,MIN,LINK,HT,NEO,USDC,MIOTA,MKR,ETC,DASH,CRO,HEDG,ONT,XEM,VET,DOGE,PAX,ZEC,BAT,SNX,DCR,TUSD,QTUM,CENNZ,FTT,ZRX,ALGO,RVN,SEELE,REP,HOT,ABBC,BTG,WAVES,NANO,OMG,THETA,ZB,DGB,MOF,VSYS,EKT,KCS,BTM,BCD,SXP,LUNA,ENJ,KMD,LSK,MCO,XVG,BTT,IOST,ICX,BCN,SC,ZEN,SLV,DX,MONA,NEXO,HC,MAID,SAI,NRG,ZIL,QNT,BTS,STEEM,ARDR,AE,KNC,EURS,STRAT,FET,ETN,DGD,TOMO,SOLVE,MATIC,SNT,CRPT,RLC,NPXS")

http_test = Net::HTTP.new(url_test.host, url_test.port)
http_test.use_ssl = true
request_test = Net::HTTP::Get.new(url_test)
request_test["X-CMC_PRO_API_KEY"] = '5239bd0f-c001-4aee-8917-6f1b98d90e4a'
request_test["Accept"] = 'application/json'
request_test["Cache-Control"] = 'no-cache'
request_test["Host"] = 'pro-api.coinmarketcap.com'
request_test["Accept-Encoding"] = 'application/json'
request_test["Connection"] = 'keep-alive'
request_test["cache-control"] = 'no-cache'

response_test = http_test.request(request_test)
puts "gets to this point"
info = JSON.parse(response_test.body)["data"]

Coin.all.each do |coin|
  coin.update_attributes(
    :img_url => info[coin.symbol]['logo'],
    :description => info[coin.symbol]['description'],
    :website => info[coin.symbol]['urls']['website'],
    :tech_doc => info[coin.symbol]['urls']['technical_doc']
  )
end

puts 'finished'
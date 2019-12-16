# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'
require 'dotenv'
require 'uri'
require 'net/http'
# require 'openssl'

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

latest_listings.map do |dataInfo|

  symbols = symbols + "," + dataInfo["symbol"]

  # byebug
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

# byebug
# url2 = URI(`http://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=#{symbols_string}`)

# http2 = Net::HTTP.new(url2.host, url2.port)
# http2.use_ssl = true
# request2 = Net::HTTP::Get.new(url2)
# request2["X-CMC_PRO_API_KEY"] = ENV["CMC_SECRET_KEY"]
# request2["Accept"] = 'application/json'
# request2["Cache-Control"] = 'no-cache'
# request2["Host"] = 'pro-api.coinmarketcap.com'
# request2["Accept-Encoding"] = 'application/json'
# request2["Connection"] = 'keep-alive'
# request2["cache-control"] = 'no-cache'

# response2 = http.request(request2)
# info = JSON.parse(response2.body)


url_test = URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XTZ,XLM,ADA,TRX,XMR,LEO,ATOM,LINK,HT,NEO,MIN,MIOTA,MKR,USDC,DASH,ETC,ONT,CRO,HEDG,XEM,VET,ZEC,DOGE,BAT,PAX,DCR,SNX,QTUM,TUSD,FTT,CENNZ,ZRX,ALGO,RVN,REP,HOT,ABBC,NANO,OMG,BTG,SEELE,EKT,ZB,THETA,DGB,KCS,LUNA,VSYS,BTM,MOF,XVG,WAVES,KMD,LSK,BCD,SXP,BTT,MCO,ENJ,ICX,IOST,SC,DX,MONA,BCN,ZEN,NEXO,HC,QNT,BTS,SAI,MAID,ZIL,NRG,SLV,STEEM,AOA,ARDR,AE,DGD,ETN,KNC,RLC,STRAT,ENG,CRPT,MATIC,EURS,SNT,SOLVE,NPXS")

http_test = Net::HTTP.new(url_test.host, url_test.port)
http_test.use_ssl = true
request_test = Net::HTTP::Get.new(url_test)
request_test["X-CMC_PRO_API_KEY"] = '5239bd0f-c001-4aee-8917-6f1b98d90e4a'
# request_test["User-Agent"] = 'PostmanRuntime/7.20.1'
request_test["Accept"] = 'application/json'
request_test["Cache-Control"] = 'no-cache'
request_test["Host"] = 'pro-api.coinmarketcap.com'
# request_test["Postman-Token"] = 'c26f4d18-aee4-41ba-aa60-e96eefabbea5'
request_test["Accept-Encoding"] = 'application/json'
# request_test["Referer"] = 'http://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XTZ,XLM,ADA,TRX,XMR,LEO,ATOM,LINK,HT,NEO,MIOTA,MKR,MIN,USDC,DASH,ETC,ONT,CRO,HEDG,VET,XEM,DOGE,BAT,ZEC,PAX,DCR,SNX,QTUM,TUSD,CENNZ,ZRX,FTT,ALGO,RVN,REP,HOT,NANO,ABBC,OMG,EKT,BTG,SEELE,ZB,DGB,VSYS,LSK,BTM,KCS,LUNA,THETA,KMD,XVG,MOF,MCO,SC,ICX,SXP,BCD,IOST,ENJ,WAVES,BTT,DX,MONA,HC,NEXO,ZIL,BCN,QNT,BTS,SAI,NRG,MAID,ZEN,STEEM,ARDR,AE,RLC,MATIC,DGD,ENG,KNC,SOLVE,SNT,ETN,EURS,FET,GNT,NPXS,GRIN,CRPT'
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
  # coin.img_url = info[coin.symbol]['logo']
  # coin.description = info[coin.symbol]['description']
  # coin.website = info[coin.symbol]['urls']['website']
  # coin.tech_doc = info[coin.symbol]['urls']['technical_doc']
end 

puts 'finished'
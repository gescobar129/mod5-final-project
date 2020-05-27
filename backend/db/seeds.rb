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

url_test = URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=#{symbols_string}")

http_test = Net::HTTP.new(url_test.host, url_test.port)
http_test.use_ssl = true
request_test = Net::HTTP::Get.new(url_test)
request_test["X-CMC_PRO_API_KEY"] = ENV["CMC_SECRET_KEY"]
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

# url = URI("https://newsapi.org/v2/everything?q=eos-cryptocurrency")

# http = Net::HTTP.new(url.host, url.port)

# request = Net::HTTP::Get.new(url)
# request["X-Api-Key"] = '9e7df49c010941e5b78a4380e0a293dc'
# request["User-Agent"] = 'PostmanRuntime/7.20.1'
# request["Accept"] = '*/*'
# request["Cache-Control"] = 'no-cache'
# request["Postman-Token"] = 'e337cb2f-0749-44e7-aa47-cc57ba89d1b1,eec405f3-5741-435a-b95d-0392004ec519'
# request["Host"] = 'newsapi.org'
# request["Accept-Encoding"] = 'gzip, deflate'
# request["Connection"] = 'keep-alive'
# request["cache-control"] = 'no-cache'

# response = http.request(request)
# puts response.read_body

puts 'finished'
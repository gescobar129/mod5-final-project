class CoinSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :rank, :price, :circulating_supply, :percent_change_1h, :percent_change_24h, :percent_change_7d, :volume_24h, :market_cap, :img_url, :description, :website, :tech_doc
end

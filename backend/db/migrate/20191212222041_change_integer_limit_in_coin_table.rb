class ChangeIntegerLimitInCoinTable < ActiveRecord::Migration[5.2]
  def change
    change_column :coins, :price, :bigint
    change_column :coins, :circulating_supply, :bigint
    change_column :coins, :percent_change_1h, :bigint
    change_column :coins, :percent_change_24h, :bigint
    change_column :coins, :percent_change_7d, :bigint
    change_column :coins, :volume_24h, :bigint
    change_column :coins, :market_cap, :bigint
  end
end

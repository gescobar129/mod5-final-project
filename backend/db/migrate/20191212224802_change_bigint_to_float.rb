class ChangeBigintToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :coins, :price, :float
    change_column :coins, :circulating_supply, :float
    change_column :coins, :percent_change_1h, :float
    change_column :coins, :percent_change_24h, :float
    change_column :coins, :percent_change_7d, :float
    change_column :coins, :volume_24h, :float
    change_column :coins, :market_cap, :float
  end
end

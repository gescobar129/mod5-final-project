class CreateCoins < ActiveRecord::Migration[5.2]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :symbol
      t.integer :rank
      t.integer :price
      t.integer :circulating_supply
      t.integer :percent_change_1h
      t.integer :percent_change_24h
      t.integer :percent_change_7d
      t.integer :volume_24h 
      t.integer :market_cap
      t.string :img_url
      t.string :description
      t.string :website
      t.string :tech_doc


      t.timestamps
    end
  end
end

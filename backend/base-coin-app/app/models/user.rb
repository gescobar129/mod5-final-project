class User < ApplicationRecord
  has_many :coins

  has_many :transactions
  has_many :purchased_coins, through: :transactions, source: :coin

  has_many :favorites
  has_many :favorite_coins, through: :favorites, source: :coin
  
  has_secure_password

  
end

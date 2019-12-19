class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password, :email, :favorite_coins, :favorites
  has_many :favorite_coins
  has_many :favorites
  has_many :transactions
end

class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :user
  has_one :coin
end

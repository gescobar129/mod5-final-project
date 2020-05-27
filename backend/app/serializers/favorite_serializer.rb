class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :coin
  has_one :coin
end

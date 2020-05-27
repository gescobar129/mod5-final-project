class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :author, :title, :description, :article_urlimage_url, :content, :source_name
  has_one :coin
end

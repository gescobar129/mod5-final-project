class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.belongs_to :coin, foreign_key: true
      t.string :author
      t.string :title
      t.string :description
      t.string :article_urlimage_url
      t.string :content
      t.string :source_name

      t.timestamps
    end
  end
end

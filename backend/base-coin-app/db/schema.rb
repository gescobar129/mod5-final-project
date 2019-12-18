# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_16_213804) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coins", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.integer "rank"
    t.float "price"
    t.float "circulating_supply"
    t.float "percent_change_1h"
    t.float "percent_change_24h"
    t.float "percent_change_7d"
    t.float "volume_24h"
    t.float "market_cap"
    t.string "img_url"
    t.string "description"
    t.string "website"
    t.string "tech_doc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "coin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_favorites_on_coin_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "coin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_transactions_on_coin_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.string "email"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "favorites", "coins"
  add_foreign_key "favorites", "users"
  add_foreign_key "transactions", "coins"
  add_foreign_key "transactions", "users"
end

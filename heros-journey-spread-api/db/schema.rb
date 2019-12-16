# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_13_143747) do

  create_table "card_points", id: false, force: :cascade do |t|
    t.integer "card_id"
    t.integer "point_id"
    t.index ["card_id"], name: "index_card_points_on_card_id"
    t.index ["point_id"], name: "index_card_points_on_point_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.string "card_type"
    t.string "meaning_up"
    t.string "meaning_inv"
    t.string "desc"
    t.string "suit"
    t.string "value"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "journeys", force: :cascade do |t|
    t.string "name"
    t.integer "character_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["character_id"], name: "index_journeys_on_character_id"
  end

  create_table "points", force: :cascade do |t|
    t.integer "querent_ref"
    t.string "description"
    t.string "querent_type"
    t.integer "querent_id"
    t.index ["querent_type", "querent_id"], name: "index_points_on_querent_type_and_querent_id"
  end

end

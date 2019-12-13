class CreatePoints < ActiveRecord::Migration[6.0]
  def change
    create_table :points do |t|
      t.integer :querent_ref
      t.string :description

      t.references :querent, polymorphic: true
    end

    create_table :card_points, id: false do |t|
      t.belongs_to :card
      t.belongs_to :point
    end
    
  end
end

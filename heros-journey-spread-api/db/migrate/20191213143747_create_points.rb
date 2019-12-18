class CreatePoints < ActiveRecord::Migration[6.0]
  def change
    create_table :points do |t|
      t.string :querent_ref
      t.string :description
      t.references :querent, polymorphic: true, optional: true
      t.timestamps
    end

    create_table :cards_points, id: false do |t|
      t.belongs_to :card
      t.belongs_to :point
    end
    
  end
end

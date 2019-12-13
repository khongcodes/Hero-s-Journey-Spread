class CreateJourneys < ActiveRecord::Migration[6.0]
  def change
    create_table :journeys do |t|
      t.string :name
      t.belongs_to :character, optional: true
      t.timestamps
    end
  end
end

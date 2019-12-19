class Point < ApplicationRecord
  belongs_to :querent, polymorphic: true, optional: true, touch: true
  has_and_belongs_to_many :cards

  def get_cards_querent_ref(arg)
    # binding.pry
    querentArray = [arg[0]]
    self.cards.delete_all
    arg[1].each do |c|
      querentArray.push("#{c[:id]} #{c[:state]}")
      self.cards.push(Card.find(c[:id]))
    end
    self.update(querent_ref: querentArray.join(", "))
  end
end

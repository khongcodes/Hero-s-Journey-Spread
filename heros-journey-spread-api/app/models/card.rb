class Card < ApplicationRecord
  has_and_belongs_to_many :points

  scope :random_order, -> {order('RANDOM()')}

  def self.random(n=1)
    random_order.limit(n)
  end

end

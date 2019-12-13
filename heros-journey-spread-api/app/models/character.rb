class Character < ApplicationRecord
  has_many :points, as: :querent
  has_many :cards, through: :points
  # has_many :journeys, optional: true
end

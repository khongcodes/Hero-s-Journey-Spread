class Character < ApplicationRecord
  has_many :points, as: :querent, dependent: :destroy
  has_many :cards, through: :points
  # has_many :journeys, depenent: :destroy
end

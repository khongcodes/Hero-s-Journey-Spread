class Point < ApplicationRecord
  belongs_to :querent, polymorphic: true
  has_and_belongs_to_many :cards
end

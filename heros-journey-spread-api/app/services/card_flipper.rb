class CardFlipper
  def initialize(card)
    @card = card
  end

  def to_serialized_json
    if rand(1..10) <= 4
      options = {except: [:meaning_rev]}
    else
      options = {except: [:meaning_up]}
    end
    @card.to_json(options)
  end

end
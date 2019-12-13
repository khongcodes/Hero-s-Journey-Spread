class CardsController < ApplicationController
  def index
    cards = Card.all
    render json: cards
  end
  
  def show
    card = Card.find(params[:id])
    render json: card
  end

  def random
    card = Card.random(params[:id].to_i)
    # card_ser = CardFlipper.new(card).to_serialized_json
    # render json: card_ser
    render json: card
  end
end

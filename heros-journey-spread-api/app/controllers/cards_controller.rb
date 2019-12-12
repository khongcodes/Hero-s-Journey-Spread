class CardsController < ApplicationController
  def show
    card = Card.find(params[:id])
    render json: card
  end
end

class CardsController < ApplicationController
  def index
    cards = Card.all
    render json: cards
  end
  
  def show
    card = Card.find(params[:id])
    render json: card
  end

  # shows both meanings
  # was going to have this only show, at random, upright OR inverted meaning but decided that at the main API level, it should render an object with consistently available properties
  def random
    card = Card.random(params[:id].to_i)
    render json: card
  end

  # only show upright meaning
  def random_up
    card = Card.random(params[:id].to_i)
    render json: card, except: [:meaning_inv]
  end

  # only show inverted meaning
  def random_inv
    card = Card.random(params[:id].to_i)
    render json: card, except: [:meaning_up]
  end
end

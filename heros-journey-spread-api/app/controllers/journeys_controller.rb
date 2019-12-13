class JourneysController < ApplicationController
  def index
    journeys = Journey.all
    render json: journeys
  end

  def show
    journey = Journey.find(params[:id])
    render json: journey
  end

  def create
    journey = Journey.create(name:params[:name])
  end
end
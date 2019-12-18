class JourneysController < ApplicationController
  def index
    journeys = Journey.all
    render json: journeys.to_json(:include => {
      :character => {:only => [:id, :name]},
      :points => {:only => [:id, :querent_ref]}
    }, :except => [:character_id, :created_at])
  end

  def show
    journey = Journey.find(params[:id])
    render json: journey
  end

  def create
    journey = Journey.create(name:params[:name])
    render json: journey
  end
end
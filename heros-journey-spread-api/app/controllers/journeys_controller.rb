class JourneysController < ApplicationController
  def index
    journeys = Journey.all
    render json: journeys.to_json(:include => {
      :character => {:only => [:id, :name]},
      :points => {:include => {
        :cards => {:only => [:id]}
      },
      :only => [:id, :querent_ref, :updated_at]}
    }, :except => [:character_id, :created_at])
  end

  def show
    journey = Journey.find(params[:id])
    render json: journey.to_json(:include => {
      :character => {:include => {
        :points => {:include => {
          :cards => {:only => [:id]}
        }, only: [:id, :querent_ref, :updated_at, :description]}
      }, only: [:id, :name]},
      :points => {:include => {
        :cards => {:only => [:id]}
      }, only: [:id, :querent_ref, :updated_at, :description]}
    }, :except => [:character_id, :created_at])
  end


  def create
    journey = Journey.create(name:params[:name])
    render json: journey
  end
end
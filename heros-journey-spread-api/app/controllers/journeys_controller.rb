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
    journey = Journey.create(name: params[:name].present? ? params[:name] : 'Journey')
    make_or_update_points(journey)

    if params[:otherResourceId].present?
      Character.find(params[:otherResourceId]).journeys.push(journey)
    end

    render json: journey.to_json(include: {
      points: {only: [:id, :querent_ref]},
    }, only: [:id, :name])
  end

  def update
    journey = Journey.find(params[:id])
    journey.update(name: params[:name].present? ? params[:name] : 'Journey')

    make_or_update_points(journey)

    render json: journey.to_json(:include => {
      points: {only:[:id, :querent_ref]},
    }, only: [:id, :name])
  end

  private

  def make_or_update_points(journey)
    params[:cards].each do |point_num, point|
      if point[:id].present?
        p = Point.find(point[:id])
        p.update(description: point[:description])
      else
        p = Point.create(description: point[:description])
        journey.points.push(p)
      end
      p.get_cards_querent_ref([point_num, point[:cards]])
    end
  end

end


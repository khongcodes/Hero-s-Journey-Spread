class CharactersController < ApplicationController
  def index
    characters = Character.all
    render json: characters.to_json(:include => {
      :points => {
        :include => {
          :cards => {:only => [:id]}
        }, :only => [:id, :querent_ref, :updated_at]}
    }, except: [:created_at])
  end

  def show
    character = Character.find(params[:id])
    render json: character.to_json(:include => {
      :points => {
        :include => {:cards => {:only => [:id]}},
        :only => [:id, :querent_ref, :updated_at, :description]}
    }, only: [:name, :id])
  end

  def create
    character = Character.create(name: params[:name].present? ? params[:name] : "Character")
    make_or_update_points(character)

    if params[:otherResourceId].present?
      character.journeys.push(Journey.find(params[:otherResourceId]))
    end
    
    render json: character.to_json(include: {
      points: {only: [:id, :querent_ref]},
    }, only: [:name, :id])
  end

  def update
    character = Character.find(params[:id])
    character.update(name: params[:name].present? ? params[:name] : "Character")
    make_or_update_points(character)

    render json: character.to_json(include: {
      points: {only: [:id, :querent_ref]},
    }, only: [:id, :name])
  end

  private

  def make_or_update_points(character)
    params[:cards].each do |point_num, point|
      if point[:id].present?
        p = Point.find(point[:id])
        p.update(description: point[:description])
      else
        p = Point.create(description: point[:description])
        character.points.push(p)
      end
      p.get_cards_querent_ref([point_num, point[:cards]])
    end
  end

end

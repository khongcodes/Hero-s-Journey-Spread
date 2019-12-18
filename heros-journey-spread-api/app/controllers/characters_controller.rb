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
    }, only: [:name])
  end

end

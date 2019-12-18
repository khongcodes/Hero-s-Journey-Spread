class CharactersController < ApplicationController
  def index
    characters = Character.all
    render json: characters.to_json(:include => {
      :points => {:only => [:id, :querent_ref]}
    }, only: [:name])
  end

  def show
    character = Character.find(params[:id])
    render json: character
  end

end

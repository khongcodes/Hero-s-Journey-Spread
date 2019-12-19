class PointsController < ApplicationController
  def create
    point = Point.create(description: (!!params[:description] ? params[:description] : ''))
    point.get_cards_querent_ref([params[:pointNum], params[:cards]])
    if params[:resourceType] == 'journey'
      resource = Journey
    else
      resource = Character
    end
    resource.find(params[:resourceId]).points.push(point)
    render json: point
  end
  
  def update
    point = Point.find(params[:id])
    point.update(description: params[:description])
    point.get_cards_querent_ref([params[:pointNum], params[:cards]])
    render json: point
  end
end

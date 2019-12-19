class PointsController < ApplicationController
  def update
    point = Point.find(params[:id])
    point.update(description: params[:description])
    render json: point
  end
end

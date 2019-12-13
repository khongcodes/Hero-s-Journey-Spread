class PointsController < ApplicationController
  def update
    point = Point.find(params[:id])
    # point.update()
  end
end

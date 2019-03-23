class ChildrenController < ApplicationController


  def index
    children = Child.all
    render json: children
  end

  # All standard set up for Rails,
  # No manipulation to the ActiveStorage details like we did before
  def create
    child = Child.create(child_params)

    render json: child
  end

  private
  def child_params
    params.permit(:name, :birth_date, forms:[])
  end
end

class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find(params[:id])
  end

  def destroy
    idea = Idea.find_by(id: params[:id])
    respond_with idea.destroy
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def update
    respond_with Idea.find_by(id: params[:id]).update(idea_params), location: nil
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end

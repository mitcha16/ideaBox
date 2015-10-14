class IdeasController < ApplicationController
  def index
  end

  def edit
    @idea = Idea.find(params[:id])
  end

  def update
    Idea.find_by(id: params[:id]).update(idea_params)
    redirect_to root_path
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end

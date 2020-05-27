class FavoritesController < ApplicationController

  def index 
    favorites = Favorite.all 

    render json: favorites
  end

  def create 
    favorite = Favorite.create(favorite_params)
    
    render json: favorite
  end

  def destroy
    # puts "jjjjjjjjjjjjjjj" params[:userId]
    # favorite = Favorite.find(params[:id])
    # favorite.destroy

    # render :json favorites, :notice => "Removed !"
  end

  # def user_favorites
  #   user = User.find(params[:id])
  #   favorites = user.all_favorites
  #   render json: favorites
  # end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :coin_id)
  end
end

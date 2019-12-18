class FavoritesController < ApplicationController

  def index 
    favorites = Favorite.all 

    render json: favorites
  end

  def create 
    favorite = Favorite.create(favorite_params)
    
    render json: favorite
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :coin_id)
  end
end

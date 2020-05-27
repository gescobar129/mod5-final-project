class UsersController < ApplicationController
  # before_action :require_login

  def index 
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end 

  def create
    # block_cypher = BlockCypher::Api.new('v1', 'btc', 'test', '22fbef419bc4415da7aeb6e5e69cbb22')

    # puts "**********************************"
    # puts block_cypher

    user = User.create(user_params)
    
    if user.valid?
        render json: {token: token(user.id), user_id: user.id}
    else
        render json: {error: user.errors.full_messages}, status: :unprocessable_entity
    end 

    
  end 

  

  private

  def user_params
      params.permit(:name, :password, :email, :state)
  end 

end

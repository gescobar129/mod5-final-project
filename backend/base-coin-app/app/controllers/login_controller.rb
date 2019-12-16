class LoginController < ApplicationController

  def create
    user = User.find_by(email: (params[:email].downcase))

    if user && user.authenticate(params[:password])
      render json: { token: token(user.id), user_id: user.id }, status: :created 
    else 
      render json: { errors: [ "Incorrect email or password" ] }, status: :unprocessable_entity
    end 
  end  

end

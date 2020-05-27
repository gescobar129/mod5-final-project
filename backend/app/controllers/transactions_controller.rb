class TransactionsController < ApplicationController

  def index 
    transactions = Transaction.all 

    render json: transactions
  end

  def create 

    transaction = Transaction.create(transaction_params)
    render json: transaction

    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    
    charge = Stripe::Charge.create(
      :amount => params[:amount].to_i * 100,
      :description => 'basecoin',
      :currency => 'usd',
      :source => params[:token]
    )
  rescue Stripe::CardError => e
    flash[:errors] = e.message
    redirect_to charges_path

    
  end


  private

  def transaction_params
    params.require(:transaction).permit(:user_id, :coin_id, :amount, :token)
  end


end

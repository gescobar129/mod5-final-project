Rails.application.routes.draw do
  resources :transactions
  resources :coins
  resources :users
  resources :login, only: :create
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  resources :articles
  resources :favorites
  resources :transactions
  resources :coins
  resources :users
  resources :login, only: :create

  # get "/users/:id/favorites", to "messages#user_favorites"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

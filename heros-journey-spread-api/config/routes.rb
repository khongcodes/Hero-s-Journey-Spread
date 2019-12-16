Rails.application.routes.draw do
  get '/cards/random/:id', to: 'cards#random', as: :random
  get '/cards/random/up/:id', to: 'cards#random_up', as: :random_up
  get '/cards/random/inv/:id', to: 'cards#random_inv', as: :random_inv
  resources :cards, only: [:index, :show]

  resources :points
  resources :characters
  resources :journeys

  
  
end

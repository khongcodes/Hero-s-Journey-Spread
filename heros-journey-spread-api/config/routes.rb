Rails.application.routes.draw do
  get '/cards/random/:id', to: 'cards#random', as: :random
  resources :cards, only: [:index, :show]

  resources :points
  resources :characters
  resources :journeys

  
  
end

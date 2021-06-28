Rails.application.routes.draw do
  root 'home#index'
  get 'metric/:id', to: 'home#index'
end

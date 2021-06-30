Rails.application.routes.draw do
  root 'home#index'
  get 'metric/:id', to: 'home#index'
  get 'api/metrics', to: 'api/metrics#index'
  post 'api/metrics', to: 'api/metrics#create'

  get 'api/measures', to: 'api/measures#index'
  post 'api/measures', to: 'api/measures#create'
end

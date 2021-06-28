Rails.application.routes.draw do
  root 'home#index'
  get 'metric/:id', to: 'home#index'
  get 'api/metrics', to: 'api/metrics#index'
  get 'api/measures', to: 'api/measures#index'
end

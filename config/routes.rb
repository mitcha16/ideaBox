Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas, only: [:edit, :update]
  namespace :api do
    namespace :v1 do
      resources :ideas
    end
  end
  mount MagicLamp::Genie, at: '/magic_lamp' if defined?(MagicLamp)

end

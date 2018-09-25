Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'register', to: 'accounts#register'
  post 'login', to: 'accounts#login'
  resources :quizzes, only: [:index, :show] do 
    member do
      post 'score'
    end
  end
end

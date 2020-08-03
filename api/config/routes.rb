Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :venue do
        post 'find_best_available_seats',
             to: 'best_available_seats#find',
             as: :find_best_available_seats
      end
    end
  end
end

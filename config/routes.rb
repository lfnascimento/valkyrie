Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :venue do
        post 'lookup_best_available_seats',
             to: 'best_available_seats#lookup',
             as: :lookup_best_available_seats
      end
    end
  end
end

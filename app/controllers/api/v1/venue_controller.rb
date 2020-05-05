module Api
  module V1
    class VenueController < ApplicationController
      def lookup_best_available_seats
        contract_result = Venue::BestAvailableSeatsContract.new(params).call

        if result.errors.empty?
          render json: result.errors, status: :unprocessable_entity
        else
          render json: best_available_seats, status: :ok
        end
      end

      private

      def 

      def best_available_seats
        Venue::BestAvailableSeatsOperation.new(params).perform
      end
    end
  end
end

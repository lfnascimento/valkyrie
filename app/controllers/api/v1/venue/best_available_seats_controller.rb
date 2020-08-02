module Api
  module V1
    module Venue
      class BestAvailableSeatsController < ApplicationController
        def find
          if contract_validation.success?
            render json: best_available_seats.as_json(only: [:id, :row, :column]), status: :ok
          else
            render json: contract_validation.errors.to_h, status: :unprocessable_entity
          end
        end

        private

        def contract_validation
          @contract_result ||= ::Venue::BestAvailableSeatsContract.
                               new.
                               call(params.to_unsafe_h.deep_symbolize_keys)
        end

        def best_available_seats
          ::Venue::BestAvailableSeatsOperation.new(contract_validation.to_h).perform
        end
      end
    end
  end
end

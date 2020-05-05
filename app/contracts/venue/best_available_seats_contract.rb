module Venue
  class BestAvailableSeatsContract < Dry::Validation::Contract
    include ::LetterNumberConvertible

    params do
      required(:venue).hash do
        required(:layout).hash do
          required(:rows).filled(:integer, gt?: 1)
          required(:columns).filled(:integer, gt?: 1)
        end
      end

      required(:seats).array(:hash)  do
        required(:row).filled(:string)
        required(:column).filled(:integer, gt?: 1)
      end
    end

    rule(:seats).each do
      if value[:column] > values[:venue][:layout][:columns]
        key.failure(I18n.t('contracts.best_available_seats.column_lt_or_eq_layout'))
      end

      if letter_to_number(value[:row]) > values[:venue][:layout][:rows]
        key.failure(I18n.t('contracts.best_available_seats.column_lt_or_eq_layout'))
      end
    end
  end
end

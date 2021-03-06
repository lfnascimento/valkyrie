module Venue
  class BestAvailableSeatsContract < Dry::Validation::Contract
    include ::LetterNumberConvertible

    params do
      optional(:party_of).maybe(:integer, gt?: 0)

      required(:venue).hash do
        required(:layout).hash do
          required(:rows).value(:integer, gt?: 1, lt?: 27)
          required(:columns).value(:integer, gt?: 1, lt?: 100)
        end
      end

      required(:seats).array(:hash) do
        required(:id).filled(:string)
        required(:row).filled(:string)
        required(:column).value(:integer, gt?: 0)
        optional(:status).value(:string)
      end
    end

    rule(:party_of) do
      if value && (value > values[:venue][:layout][:rows])
        key.failure(I18n.t('contracts.venue.best_available_seats.party_of_lt_or_eq_layout_row_size'))
      end
    end

    rule(:seats).each do
      if value[:column] > values[:venue][:layout][:columns]
        key.failure(I18n.t('contracts.venue.best_available_seats.column_lt_or_eq_layout_size'))
      end

      if letter_to_number(value[:row]) > values[:venue][:layout][:rows]
        key.failure(I18n.t('contracts.venue.best_available_seats.row_lt_or_eq_layout_size'))
      end
    end
  end
end

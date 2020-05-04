class Venue::BestAvailableSeatsContract < Dry::Validation::Contract
  include LetterNumberConvertible

  params do
    required(:venue).hash do
      required(:layout).hash do
        required(:rows).filled(:integer, gt?: 1)
        required(:columns).filled(:integer, gt?: 1)
      end
    end

    required(:seats).array(:hash) do
      required(:row).filled(:string)
      required(:column).filled(:integer, gt?: 1)
    end
  end

  rule(:seats).each do
    if value[:column] > values[:venue][:layout][:columns]
      key.failure("column should be less than or equal venue layout's columns")
    end

    if letter_to_number(value[:row]) > values[:venue][:layout][:rows]
      key.failure("row should be less than or equal venue layout's rows")
    end
  end
end

module Venue
  class BestAvailableSeatsOperation
    include ::LetterNumberConvertible

    attr_reader :venue, :party_of, :best_available_seats

    def initialize(venue, party_of = 1)
      @venue = venue
      @party_of = party_of
      @best_available_seats = []
    end

    def perform
      venue[:seats].each(&method(:calculate_distance_from_best_seats))
      if party_of > 1
        venue[:seats].group_by { |seat| seat[:row] }.values.each(&method(:lookup_best_consecutive_seats))
        best_available_seats
      else
        best_available_seats.push(venue[:seats].min_by { |seat| seat[:distance] })
      end
    end

    private

    def lookup_best_consecutive_seats(row)
      return if party_of > row.size

      check_consecutive_seats(row.sort_by { |seat| seat[:distance] })
    end

    def check_consecutive_seats(row)
      while party_of <= row.size do
        break if set_best_consecutive_available_seats(row.first(party_of))

        row.shift
      end
    end

    def set_best_consecutive_available_seats(seats)
      @best_available_seats = seats if best_consecutive_available_seats?(seats)
    end

    def best_consecutive_available_seats?(seats)
      consecutive_seats?(seats) &&
        ((seats.sum(0) { |seat| seat[:distance] } < best_available_seats.sum(0) { |seat| seat[:distance] }) ||
         best_available_seats.empty?)
    end

    def consecutive_seats?(seats)
      return false if seats.size != party_of

      columns = seats.map { |seat| seat[:column] }
      columns.max - columns.min + 1 == columns.size
    end

    def calculate_distance_from_best_seats(seat)
      seat[:distance] = best_seats.map do |best_seat|
        calculate_distance(best_seat[:col],
                           best_seat[:row],
                           seat[:column].to_i,
                           letter_to_number(seat[:row]))
      end.min
    end

    def calculate_distance(best_seat_col, best_seat_row, seat_col, seat_row)
      Math.sqrt(((best_seat_col - seat_col) ** 2) + ((best_seat_row - seat_row) ** 2))
    end

    def best_seats
      @best_seats ||= calculate_best_seat_columns.map { |col| { row: 1, col: col } }
    end

    def calculate_best_seat_columns
      row_size.even? ? [(row_size / 2), ((row_size / 2) + 1)] : [(row_size / 2.0).ceil]
    end

    def row_size
      @row_size ||= venue.dig(:venue, :layout, :rows).to_i
    end
  end
end

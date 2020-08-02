require 'rails_helper'

describe Venue::BestAvailableSeatsOperation, type: :operation do
  subject { described_class.new(request) }

  describe '#perform' do
    context 'party of 1' do
      context 'venue with a odd number of columns' do
        context 'when the best seat is not available' do
          let(:request) do
            JSON.parse(File.read('spec/support/files/venue/venue_with_odd_column.json'), symbolize_names: true)
          end

          it do
            expect(subject.perform).to eq([
              {
                column: 5,
                distance: 1.4142135623730951,
                id: "b5",
                row: "b",
                status: "AVAILABLE"
              }
            ])
          end
        end

        context 'when the best seat is available' do
          let(:request) do
            JSON.parse(File.read('spec/support/files/venue/venue_with_odd_column_and_when_the_best_seat_is_available.json'),
                       symbolize_names: true)
          end

          it do
            expect(subject.perform).to eq([
              {
                column: 5,
                distance: 0,
                id: "a5",
                row: "a",
                status: "AVAILABLE"
              }
            ])
          end
        end
      end

      context 'venue with a even number of columns' do
        let(:request) do
          JSON.parse(File.read('spec/support/files/venue/venue_with_even_column.json'), symbolize_names: true)
        end

        it do
          expect(subject.perform).to eq [
            {
              column: 5,
              distance: 1.0,
              id: "b5",
              row: "b",
              status: "AVAILABLE"
            }
          ]
        end
      end
    end

    context 'party of greater than 1' do
      context 'venue with a even number of columns and consecutive availabel seats' do
        let(:request) do
          JSON.parse(File.read('spec/support/files/venue/venue_with_even_column_and_consecutive_seats_available.json'),
                     symbolize_names: true)
        end

        it do
          expect(subject.perform).to eq [
            {
              column: 5,
              distance: 2.0,
              id: "c5",
              row: "c",
              status: "AVAILABLE"
            },
            {
              column: 6,
              distance: 2.0,
              id: "c6",
              row: "c",
              status: "AVAILABLE"
            }
          ]
        end
      end

      context 'venue with a odd number of columns and more than one group of consecutive available seats on the same row' do
        let(:request) do
          JSON.parse(File.read('spec/support/files/venue/with_an_odd_number_of_columns_and_more_than_one_group_of_consecutive_available_seats_on_the_same_row.json'),
                     symbolize_names: true)
        end

        it do
          expect(subject.perform).to eq [
            {
              id: "b6",
              row: "b",
              column: 6,
              distance: 1.4142135623730951,
              status: "AVAILABLE"
            },
            {
              id: "b7",
              row: "b",
              column: 7,
              distance: 2.23606797749979,
              status: "AVAILABLE"
            },
            {
              id: "b8",
              row: "b",
              distance: 3.1622776601683795,
              column: 8,
              status: "AVAILABLE"
            }
          ]
        end
      end
    end
  end
end

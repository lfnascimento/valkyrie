require 'rails_helper'

describe Venue::BestAvailableSeatsOperation, type: :operation do
  subject { described_class.new(request) }

  describe '#perform' do
    context 'party of 1' do
      context 'venue with a odd number of columns size' do
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
            JSON.parse(File.read('spec/support/files/venue/venue_with_odd_column_and_when_the_best_seat_is_available.json'), symbolize_names: true)
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

      context 'venue with a even number of columns size' do
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

      context 'party of 2' do
        context 'venue with a even number of columns size and consecutive seats available' do
          let(:request) do
            JSON.parse(File.read('spec/support/files/venue/venue_with_even_column_and_consecutive_seats_available.json'),
                       symbolize_names: true)
          end

          it do
            expect(subject.perform).to eq [
              {
                column: 4,
                distance: 2.0,
                id: "c4",
                row: "c",
                status: "AVAILABLE"
              },
              {
                column: 5,
                distance: 2.23606797749979,
                id: "c5",
                row: "c",
                status: "AVAILABLE"
              }
            ]
          end
        end
      end
    end
  end
end

require 'rails_helper'

describe Venue::BestAvailableSeatsOperation, type: :operation do
  subject { described_class.new(venue, party_of) }

  describe '#perform' do
    context 'party of 1' do
      let(:party_of) { 1 }
      context 'venue with a odd row size' do
        let(:venue) do
          JSON.parse(File.read('spec/support/files/venue/venue_with_odd_row.json'), symbolize_names: true)
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

      context 'venue with a even row size' do
        let(:venue) do
          JSON.parse(File.read('spec/support/files/venue/venue_with_even_row.json'), symbolize_names: true)
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
        let(:party_of) { 2 }

        context 'venue with a even row size and consecutive seats available' do
          let(:venue) do
            JSON.parse(File.read('spec/support/files/venue/venue_with_even_row_and_consecutive_seats_available.json'),
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

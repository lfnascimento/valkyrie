require 'rails_helper'

describe Venue::BestAvailableSeatsContract, type: :contract do
  describe '#call' do
    context 'when party of gt than layout row size' do
      it do
        result = subject.call(party_of: 7, venue: { layout: { rows: 5, columns: 5 } })
        expect(result.failure?).to be_truthy
        expect(result.errors.to_h[:party_of]).to_not be_empty
      end
    end

    context 'when seat row gt than layout row size' do
      let(:request) do
        {
          party_of: 1,
          venue: {
            layout: {
              rows: 5,
              columns: 5
            }
          },
          seats: [{
            id: 'f5',
            row: 'f',
            column: 5
          }]
        }
      end
      it do
        result = subject.call(request)
        expect(result.failure?).to be_truthy
        expect(result.errors.to_h[:seats][0]).
          to include(I18n.t('contracts.venue.best_available_seats.row_lt_or_eq_layout_size'))
      end
    end

    context 'when seat column gt than layout column size' do
      let(:request) do
        {
          party_of: 1,
          venue: {
            layout: {
              rows: 5,
              columns: 5
            }
          },
          seats: [{
            id: 'e6',
            row: 'e',
            column: 6
          }]
        }
      end
      it do
        result = subject.call(request)
        expect(result.failure?).to be_truthy
        expect(result.errors.to_h[:seats][0]).
          to include(I18n.t('contracts.venue.best_available_seats.column_lt_or_eq_layout_size'))
      end
    end
  end
end

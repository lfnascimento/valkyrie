require 'rails_helper'

describe 'Lookup Best Available Seats API Endpoint', type: :request do
  describe 'POST /api/v1/venue/lookup_best_available_seats' do
    before { post api_v1_venue_lookup_best_available_seats_path, params: params }

    context 'with valid params' do
      let(:params) do
        {
          venue: {
            layout: {
              rows: 5,
              columns: 5
            }
          },
          seats: [
            {
              id: 'a1',
              row: 'a',
              column: 5,
              status: 'AVAILABLE'
            }
          ]
        }
      end

      it { expect(response).to have_http_status(:ok) }
    end

    context 'with invalid params' do
      let(:params) { {} }

      it { expect(response).to have_http_status(:unprocessable_entity) }
    end
  end
end

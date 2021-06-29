# frozen_string_literal: true

require 'test_helper'

module Api
  module MeasuresControllerTest
    class IndexTest < ActionDispatch::IntegrationTest
      class MetricMissing < IndexTest
        test 'return 401 message' do
          get '/api/measures'
          assert_response :bad_request
        end
      end

      class MetricNotFound < IndexTest
        test 'return 404 message' do
          get "/api/measures?metric_id=#{Random.uuid}"
          assert_response :not_found
        end
      end

      class EmptyResponse < IndexTest
        setup do
          Measure.destroy_all
          @metric = Metric.create(name: 'the name')
        end

        test 'returns empty response' do
          get "/api/measures?metric_id=#{@metric.id}"

          assert_response :success
          empty_response = response.parsed_body
          assert_equal @metric.id, empty_response['metric']['id']
          assert_equal @metric.name, empty_response['metric']['name']
          assert_equal [], empty_response['measures']
        end
      end

      class SuccessResponse < IndexTest
        setup do
          @metric = Metric.create!(name: 'the name')
          @measures = []
          Timecop.freeze(DateTime.now) do
            4.times { @measures << Measure.new(metric: @metric, value: rand(0.0...999.99999)) }
          end
          @measures.each(&:save!)
        end

        def expected_measures
          average = (@measures.reduce(0) { |acc, measure| acc + measure.value } / @measures.count).to_f

          @measures.map do |measure|
            {
              'timestamp' => measure.created_at.utc.to_i,
              'measure' => measure.value.to_f,
              'avgMinute' => average,
              'avgHour' => average,
              'avgDay' => average
            }
          end
        end

        test 'returns success response' do
          get "/api/measures?metric_id=#{@metric.id}"

          assert_response :success
          empty_response = response.parsed_body
          assert_equal @metric.id, empty_response['metric']['id']
          assert_equal @metric.name, empty_response['metric']['name']
          assert_equal expected_measures, empty_response['measures']
        end
      end
    end
  end
end

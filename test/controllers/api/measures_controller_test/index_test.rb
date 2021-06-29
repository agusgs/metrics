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
          assert_equal [], response.parsed_body['measures']
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
          assert_equal expected_measures, response.parsed_body['measures']
        end
      end

      class SuccessFilterResponse < IndexTest
        setup do
          @metric = Metric.create!(name: 'the name')
          Timecop.freeze(DateTime.now) do
            @today_measure = Measure.create!(metric: @metric, value: rand(0.0...999.99999))
          end

          Timecop.freeze(1.day.ago) do
            Measure.create!(metric: @metric, value: rand(0.0...999.99999))
          end
        end

        def expected_measures
          [
            {
              'timestamp' => @today_measure.created_at.utc.to_i,
              'measure' => @today_measure.value.to_f,
              'avgMinute' => @today_measure.value.to_f,
              'avgHour' => @today_measure.value.to_f,
              'avgDay' => @today_measure.value.to_f
            }
          ]
        end

        test 'returns success response' do
          get "/api/measures?metric_id=#{@metric.id}&from=#{10.minutes.ago.to_i}"

          assert_response :success
          assert_equal expected_measures, response.parsed_body['measures']
        end
      end
    end
  end
end

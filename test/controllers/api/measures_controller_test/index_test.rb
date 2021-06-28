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

        def empty_measures
          [
            { 'name' => Measures::AVERAGE_PER_DAY_NAME, 'measures' => [] },
            { 'name' => Measures::AVERAGE_PER_HOUR_NAME, 'measures' => [] },
            { 'name' => Measures::AVERAGE_PER_MINUTE_NAME, 'measures' => [] },
            { 'name' => Measures::ALL_MEASURES_NAME, 'measures' => [] }
          ]
        end

        test 'returns empty response' do
          get "/api/measures?metric_id=#{@metric.id}"

          assert_response :success
          empty_response = response.parsed_body
          assert_equal @metric.id, empty_response['metric']['id']
          assert_equal @metric.name, empty_response['metric']['name']
          assert_equal empty_measures, empty_response['measures']
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
          created_at_utc = @measures.first.created_at.utc

          expected_day = [{ 'timestamp' => created_at_utc.at_beginning_of_day.to_i, 'measure' => average }]
          expected_hour = [{ 'timestamp' => created_at_utc.at_beginning_of_hour.to_i, 'measure' => average }]
          expected_minute = [{ 'timestamp' => created_at_utc.at_beginning_of_minute.to_i, 'measure' => average }]
          expected_all = @measures.map do |measure|
            { 'timestamp' => measure.created_at.utc.to_i, 'measure' => measure.value.to_f }
          end

          [
            { 'name' => Measures::AVERAGE_PER_DAY_NAME, 'measures' => expected_day },
            { 'name' => Measures::AVERAGE_PER_HOUR_NAME, 'measures' => expected_hour },
            { 'name' => Measures::AVERAGE_PER_MINUTE_NAME, 'measures' => expected_minute },
            { 'name' => Measures::ALL_MEASURES_NAME, 'measures' => expected_all }
          ]
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

require "rails_helper"
require 'helpers/ajax'

class ViewItemsTest < ActionDispatch::IntegrationTest

  test 'user can see items' do
    visit '/'
    assert page.has_content?("Idea")
  end
end

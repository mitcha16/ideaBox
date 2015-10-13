require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  test 'it has a title' do
    assert_equal 'idea 2', Idea.first.title
  end

  test 'it has a body' do
    assert_equal 'MyString', Idea.first.body
  end
end

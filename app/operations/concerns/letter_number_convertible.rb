module LetterNumberConvertible
  extend ActiveSupport::Concern

  private

  def letter_to_number(letter)
    letter.upcase.tr('A-Z', '1-9a-q').to_i(27)
  end
end

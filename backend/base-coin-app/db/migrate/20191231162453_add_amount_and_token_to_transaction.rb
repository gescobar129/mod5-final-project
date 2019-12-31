class AddAmountAndTokenToTransaction < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :amount, :integer
    add_column :transactions, :token, :string
  end
end

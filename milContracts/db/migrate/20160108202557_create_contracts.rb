class CreateContracts < ActiveRecord::Migration
  def change
    create_table :contracts do |t|
      t.string :title
      t.string :link
      t.string :description
      t.datetime :pubdate
      t.money :dollar_amt
      t.string :creator
    end
  end
end

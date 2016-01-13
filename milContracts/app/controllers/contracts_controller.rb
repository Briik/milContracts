class ContractsController < ApplicationController
	def formatted_number(n)
		if !n
			return 0
		else
	  	a,b = sprintf("%0.2f", n).split('.')
	  	a.gsub!(/(\d)(?=(\d{3})+(?!\d))/, '\\1,')
	  	"$#{a}.#{b}"
		end
	  end

	  def index
		  @contracts = Contract.all
		  def get_num
			  tot = 0
		  	@contracts.each do |a|
			  tot += a.dollar_amt.to_i
		  	end
			  return tot
		  end
		  @totalNum = formatted_number(get_num)
	  end

	  def show
		  @contract = Contract.find(params[:id])
		  @money = formatted_number(@contract.dollar_amt)
      end

	  def update
      end
      def new
        #   this should be an automated process that occurs every weekday at 6:10pm
      end
      def create
      end
end

class ContractsController < ApplicationController
	  def index
		  @contracts = Contract.all
		  def get_num
			  tot = 0
		  	@contracts.each do |a|
			  tot += a.dollar_amt.to_f
		  end
			  return tot
		  end
		  @totalNum = get_num
	  end
      def show
		  @contract = Contract.find(params[:id])
		  @money = @contract.dollar_amt.to_f
      end
      def update
      end
      def new
        #   this should be an automated process that occurs every weekday at 6:10pm
      end
      def create
      end
end

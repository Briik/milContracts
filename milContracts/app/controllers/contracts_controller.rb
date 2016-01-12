class ContractsController < ApplicationController
	  def index
		  @contracts = Contract.all
	  end
      def show
		  @contract = Contract.find(params[:id])
      end
      def update
      end
      def new
        #   this should be an automated process that occurs every weekday at 6:10pm
      end
      def create
      end
end

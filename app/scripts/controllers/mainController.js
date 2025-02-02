angular.module('ethExplorer')
    .controller('mainCtrl', function ($rootScope, $scope, $location) {

	var web3 = $rootScope.web3;
	var maxBlocks = 100; // TODO: into setting file or user select
	var blockNum = $scope.blockNum = parseInt(web3.eth.blockNumber, 10);
	if (maxBlocks > blockNum) {
	    maxBlocks = blockNum + 1;
	}

	// get latest 50 blocks
	$scope.blocks = [];
	for (var i = 0; i < maxBlocks; ++i) {
	    $scope.blocks.push(web3.eth.getBlock(blockNum - i));
	}
	
        $scope.processRequest = function() {
	    var requestStr = $scope.ethRequest.split('0x').join('');
            if(requestStr.length === 64) {
              if(/[0-9a-zA-Z]{64}?/.test(requestStr))
                return goToTxInfos('0x'+requestStr)
              else if(/[0-9]{1,7}?/.test(requestStr))
                return goToBlockInfos(requestStr)
            }
            if(parseInt(requestStr) > 0)
              return goToBlockInfos(parseInt(requestStr))
            if (requestStr.length === 31)
                return goToAddrInfos(requestStr)

            alert('Don\'t know how to handle '+ requestStr)
        };

	    $scope.localtime = function (timestamp) {
            var newDate = new Date()
            newDate.setTime(1000 * timestamp)
            return newDate.toLocaleString()
        }


        function goToBlockInfos(requestStr) {
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr) {
            $location.path('/address/'+requestStr);
        }

         function goToTxInfos (requestStr) {
             $location.path('/transaction/'+requestStr);
        }

    });

angular.module("ibus", []);
angular.module("ibus").controller("ibusController", ['$scope', '$http', function ($scope, $http){
   
    // Profile on Github
    // $http.get('https://api.github.com/users/LuizPauloLPG2').then(function(data){  
    //     console.log(data);
    // }); 
    
    $http({
        method: 'GET',
        url: './controller/ClienteController/_getFindAll.php'
    }).then(function(response){  
        var countClientes = response.data.length;

        new Noty({
            type: 'warning',
            layout: 'top',
            layout: 'topRight',
            theme: 'nest',
            text: 'CLIENTES ENCONTRADOS: [' + countClientes + ']',
            timeout: '3000',
            progressBar: true,
            closeWith: ['click'],
            killer: true,
            volume: 1
         }).show();

        $scope.clientes = response.data;

    },function(err) {
        new Noty({
            type: 'error',
            layout: 'top',
            layout: 'topRight',
            theme: 'nest',
            // text: err.statusText,
            text: err.data,
            timeout: '3000',
            progressBar: true,
            closeWith: ['click'],
            killer: true,
         }).show();

        console.log(err);
    });

    $scope.addCliente = function(cliente){
        cliente.status = "A";
        
        var data = {
            'nome': cliente.nome,
            'rg': cliente.rg,
            'celular': cliente.celular,
            'telefone': cliente.telefone,
            'endereco': cliente.endereco,
            'numero_endereco': cliente.numero_endereco,
            'status': cliente.status
        };
        
        $http.post('./controller/ClienteController/_postSaveCliente.php', {data})
        .then(function(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });
        
        // $scope.clientes.push(angular.copy(cliente));
        $scope.clientes.push(cliente);
        delete $scope.cliente;

        new Noty({
            type: 'success',
            layout: 'top',
            layout: 'topRight',
            theme: 'nest',
            text: 'Cliente cadastrado com sucesso!',
            timeout: '3000',
            progressBar: true,
            closeWith: ['click'],
            killer: true,
            volume: 1
         }).show();
    }

    // $scope.delCliente = function(clientes){
    //     $scope.clientes = clientes.filter(function (cliente){
    //       if(!cliente.selected){
    //         return cliente;
    //       }      
    //     });
    // }

}]);


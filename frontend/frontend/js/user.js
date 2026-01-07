
        angular.module('userApp', [])
            .controller('UserController', function($scope, $http) {
                $scope.users = [];
                $scope.newUser = {};

                // Load users
                $scope.loadUsers = function() {
                    $http.get('http://localhost:8000/api/users/')
                        .then(function(response) {
                            $scope.users = response.data;
                        })
                        .catch(function(error) {
                            console.error('Error loading users:', error);
                        });
                };

                // Add user
                $scope.addUser = function() {
                    $http.post('http://localhost:8000/api/users/', $scope.newUser)
                        .then(function(response) {
                            $scope.users.push(response.data);
                            $scope.newUser = {};
                        })
                        .catch(function(error) {
                            console.error('Error adding user:', error);
                        });
                };

                // Edit user
                $scope.editUser = function(user) {
                    user.original = angular.copy(user);
                    user.editing = true;
                };

                // Save user
                $scope.saveUser = function(user) {
                    $http.put('http://localhost:8000/api/users/' + user.id + '/', user)
                        .then(function(response) {
                            user.editing = false;
                            delete user.original;
                        })
                        .catch(function(error) {
                            console.error('Error saving user:', error);
                        });
                };

                // Cancel edit
                $scope.cancelEdit = function(user) {
                    angular.copy(user.original, user);
                    user.editing = false;
                    delete user.original;
                };

                // Delete user
                $scope.deleteUser = function(user) {
                    if (confirm('Are you sure you want to delete this user?')) {
                        $http.delete('http://localhost:8000/api/users/' + user.id + '/')
                            .then(function() {
                                var index = $scope.users.indexOf(user);
                                $scope.users.splice(index, 1);
                            })
                            .catch(function(error) {
                                console.error('Error deleting user:', error);
                            });
                    }
                };

                // Initial load
                $scope.loadUsers();
            });

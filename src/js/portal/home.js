X.sub("init", function() {
    if(1==1){
        X.loadTmpl(".navbar-header", '/resources/portal/home-navbar-header.txt', function() {
            X.loadTmpl("#navbar-content", '/resources/portal/home-dropdown-user-menu.txt', function() {
                X.loadTmpl("#mainnav-containe", '/resources/portal/home-mainnav-menu.txt', function() {
                    X.loadTmpl("#aside", '/resources/portal/home-aside.txt', function() {
                    });
                });
            });
        });
    }
});
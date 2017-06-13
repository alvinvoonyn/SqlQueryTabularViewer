# SqlQueryTabularViewer
Tabular Data Display, Sortable, Filterable, Searchable and Retrieve from MySQL Database by using MySQL Query Command.

# Basic Setup
The first step is to have the right CSS and JavaScript files. Make sure you are including the Bootstrap CSS file, as well as the SQL Query Tabular Viewer, jQuery, Bootstrap and AngularJS JavaScript files, in the <head> of your web pages.


jQuery, Bootstrap and AngularJS must be loaded before SQL Query Tabular Viewer JavaScript.

Configure your MySQL hostname, username, password and the database in the sql_query.php. This PHP must be configured properly in order to communicate to the MySQL server.


# Insert SQL Query Command
In order to display data in tabular form, you are required to insert the SQL query command to retrieve the data from the database. Include the data-ng-sql and insert the command to it in your HTML page. Besides that, make sure data-ng-view is included after the data-ng-sql command.

$.response.status = $.net.http.MOVED_PERMANENTLY;
// $.response.headers.set("Location","https://myi342070trial.hanatrial.ondemand.com/titanic/service/create.xsjs");
$.response
		.setBody("this URL has been DEPECREATED, "
				+ "please use ODATA service on "
				+ "<a href = 'https://myi342070trial.hanatrial.ondemand.com/titanic/service/list.xsodata'>"
				+ "this endpoint</a> instead.");
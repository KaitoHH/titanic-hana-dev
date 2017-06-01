function serviceInit() {
	$.import("titanic/lib/util","util");
}

function process() {
	if ($.titanic.lib.util.validateMethod()) {
		var connection = $.hdb.getConnection();
		var addParameter = connection.loadProcedure('TITANIC',
				'MODEL_ADD_PARAM');
		$.response.contentType = "application/json";
		var g = $.titanic.lib.util.generalizeParam;
		var model_id = $.request.parameters.get("model_id");
		var paramName = $.request.parameters.get("name");
		var intArgs = $.request.parameters.get("intArgs");
		var doubleArgs = $.request.parameters.get("doubleArgs");
		var stringArgs = $.request.parameters.get("stringArgs");
		if ($.titanic.lib.util.parameterExist(model_id)
				&& $.titanic.lib.util.parameterExist(paramName)) {
			addParameter(model_id, paramName, g(intArgs), g(doubleArgs), g(stringArgs));
			connection.commit();
			$.response.status = $.net.http.CREATED;
			return {
				"result" : "SUCEESS"
			};
		} else {
			$.response.status = $.net.http.OK;
			return {
				"result" : "please sepecify parameter name"
			};
		}
	} else {
		$.response.status = $.net.http.METHOD_NOT_ALLOWED;
		return "this service MUST be request with POST method.";
	}
}

function main() {
	serviceInit();
	$.response.setBody(JSON.stringify(process()));
}

main();

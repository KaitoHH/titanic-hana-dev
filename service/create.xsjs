function serviceInit() {
	$.import("titanic/lib/util","util");
}

function process() {
	if ($.titanic.lib.util.validateMethod()) {
		var connection = $.hdb.getConnection();
		var createModel = connection.loadProcedure('TITANIC', 'MODEL_CREATE');
		$.response.contentType = "application/json";
		var modelName = $.request.parameters.get("name");
		if ($.titanic.lib.util.parameterExist(modelName)) {
			var result = createModel(modelName, 0);
			var model_id = result['OUT_MODEL_ID'];
			connection.commit();
			$.response.status = $.net.http.CREATED;
			return {
				"model_id" : model_id,
				"result" : "SUCEESS"
			};
		} else {
			$.response.status = $.net.http.OK;
			return {
				"result" : "please sepecify model name"
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

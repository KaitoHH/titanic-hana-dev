function serviceInit() {
	$.import("titanic/lib/util","util");
}

function process() {
	if ($.titanic.lib.util.validateMethod()) {
		var connection = $.hdb.getConnection();
		var testModel = connection.loadProcedure('TITANIC', 'DDL_RF_PREDICT');
		$.response.contentType = "application/json";
		var g = $.titanic.lib.util.generalizeParam;
		var model_id = $.request.parameters.get("model_id");
		var tableName = $.request.parameters.get("table");
		if ($.titanic.lib.util.parameterExist(model_id)
				&& $.titanic.lib.util.parameterExist(tableName)) {
			try {
				var result = testModel(tableName, model_id, null);
			} catch (e) {
				return {
					"result" : e.toString()
				}
			}
			connection.commit();
			$.response.status = $.net.http.CREATED;
			return {
				"result" : result
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

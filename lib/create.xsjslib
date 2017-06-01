function createModel(param) {
	var after = param.afterTableName;
	var connection = $.hdb.getConnection();
	var createModel = connection.loadProcedure('TITANIC', 'MODEL_CREATE');
	var pStmt = param.connection.prepareStatement('select * from "' + after
			+ '"');
	pStmt.executeQuery();
	var rs = pStmt.executeQuery();
	if (rs.next()) {
		var name = rs.getString(2);
		var result = createModel(name, 0);
		var model_id = result['OUT_MODEL_ID'];
		connection.commit();
		pStmt = param.connection.prepareStatement('update "' + after
				+ '" set MODEL_ID=' + model_id);
		pStmt.executeUpdate();
		pStmt.close();
	}
	rs.close();
}

function addParam(param) {
	var after = param.afterTableName;
	var connection = $.hdb.getConnection();
	var addParameter = connection.loadProcedure('TITANIC', 'MODEL_ADD_PARAM');
	var pStmt = param.connection.prepareStatement('select * from "' + after
			+ '"');
	pStmt.executeQuery();
	var rs = pStmt.executeQuery();
	if (rs.next()) {
		var model_id = rs.getInteger(1);
		var paramName = rs.getString(2);
		var intArgs = rs.getInteger(3);
		var doubleArgs = rs.getDouble(4);
		var stringArgs = rs.getString(5);
		addParameter(model_id, model_id, paramName, intArgs, doubleArgs,
				stringArgs);
		connection.commit();
	}
	rs.close();
}
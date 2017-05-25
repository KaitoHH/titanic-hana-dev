var connection = $.hdb.getConnection();
connection.setAutoCommit(true);
var createModel = connection.loadProcedure('TITANIC', 'MODEL_CREATE');
var addParameter = connection.loadProcedure('TITANIC','MODEL_ADD_PARAM');
var trainModel = connection.loadProcedure('TITANIC','DDL_RF_TRAIN');
var predictModel = connection.loadProcedure('TITANIC','DDL_RF_PREDICT');

var result = createModel('create from xsjs 2.15',0);
var model_id = result['OUT_MODEL_ID'];

addParameter(model_id,'TREES_NUM',500,null,null);
addParameter(model_id,'CONTINUOUS_COL',3,null,null);
addParameter(model_id,'CONTINUOUS_COL',4,null,null);

trainModel('"TITANIC"."titanic::Data.train_view"',model_id);

result = predictModel('"TITANIC"."titanic::Data.real_test_view"',model_id,null);

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(result));

connection.commit();
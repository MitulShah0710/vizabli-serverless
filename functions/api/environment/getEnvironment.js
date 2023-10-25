const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { ENVIRONMENT_TABLE } = process.env;

module.exports.handler = async (event) => {
  console.log('event', event);
  const params = event.pathParameters;
  const { id } = params;
  console.log('params id', id)

  // const environments =  [
  //   {
  //     "id": "1",
  //     "hospitalName": "AG",
  //     "envName": "AG ENV",
  //     "description": "AG DESC",
  //   },
  //   {
  //     "id": "2",
  //     "hospitalName": "Einstein Medical Center",
  //     "envName": "Einstein Medical Center ENV",
  //     "description": "Einstein Medical Center DESC",
  //   },
  // ]

  // const environment = environments.find((env) => env.id === id)

  const getParams = {
    TableName: ENVIRONMENT_TABLE,
    Key: {
      id,
    },
  };
  console.log('getParams', getParams);
  const getItemResponse = await docClient.get(getParams).promise();
  console.log('getItemResponse', getItemResponse);
  const environment = getItemResponse && getItemResponse.Item ? getItemResponse.Item : null;
  const responseBody = {
    data: environment
  }
  console.log('responseBody', responseBody);
  const response = {
    statusCode : 200,
    body : JSON.stringify(responseBody),
    isBase64Encoded : false,
    headers : {"content-type" : "application/json"}
  }
  return response;
}

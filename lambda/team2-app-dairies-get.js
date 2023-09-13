//日記一覧API用のJSファイルです。
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const tableName = "team2-Dialy";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  // ログインしているユーザーでなかった場合
  if (event.headers.authorization !== "mtiToken") {
    // ステータスコード401を返す
    response.statusCode = 401;
    // レスポンスボディにメッセージを返す
    response.body = JSON.stringify({
      message: 
      "このユーザーはログインできていません。authorizationにmtiTokenを入力してください",
    });
    
    // ログイン
    return response;
  }

  // リクエストリング
//   const userId = event.queryStringParameters.userId;

  // リクエストの型
  const param = {
    tableName,
    limit:100,
  };
  console.log("parameters")
  console.log(param)
  // データ取得するコマンド
  const command = new ScanCommand(param);
  
  try {
    // データを取得してitemのみを取得
    const dialy = (await client.send(command));

    response.body = JSON.stringify(unmarshall(dialy));
    
  console.log("diary")
  console.log(dialy)

  } 
  // エラーの場合
  catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
    
  }
  
  // レスポンス内容
  return response;
};
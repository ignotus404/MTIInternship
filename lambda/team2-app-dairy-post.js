//日記登録API用のJSファイルです。
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team2-Dialy";

const crypto = require("crypto");


exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する

  const {userId,foodName,text}=JSON.parse(event.body);
  const dairyId=crypto.randomUUID();
  
  console.log("event.body");
  console.log(event.body);
  console.log("dairyId");
  console.log(dairyId);
  
  // var date = new Date() ;
  
  console.log("date");
  console.log(Date.now());
  const updateDate=String(Date.now()) ;

  // TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {
    TableName,
    Item: marshall({
        dairyId,
        userId,
        foodName,
        text,
        updateDate,
      })
  };
  console.log("param")
  console.log(param)

  // DBにデータを登録するコマンドを用意
  const command = new PutItemCommand(param);

  try {
    // client.send()でDBにデータを登録するコマンドを実行
    await client.send(command);
    // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
    response.statusCode = 201

    response.body = JSON.stringify({result:true})

  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};

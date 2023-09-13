//ユーザー情報取得API用のJSファイルです。
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const UserTable = "team2-user";
const FoodTable = "team2-food";

exports.handler = async (event, context) => 
{
  //レスポンスの雛形
  const response = 
  {
    statusCode: 200,
    headers: 
    {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  const UserID = event.queryStringParameters?.UserID;
  let foodId;
  
  if(UserID === undefined)
  {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "無効なリクエスト。必要なパラメータを入力してください"
    });
    
    return response;
  }
  
  const UserTableParam = 
  {
    TableName: UserTable,
    Key: marshall
    ({
      UserID,
    }),
  };

  // 指定したアイテムを取得するコマンドを用意
  const GetUserDataCommand = new GetItemCommand(UserTableParam);
  
  //まずUserId使ってUserテーブルから情報を引っ張る
  try 
  {
    const user = (await client.send(GetUserDataCommand)).Item;
    foodId = unmarshall(user)?.DairyFoodID;
    
    if(foodId === undefined)
    {
      response.body = JSON.stringify
      ({
        message:"team2-userから情報が取得できていません"
      });
      return response;
    }
    
    
  } 
  catch (e) 
  {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "今日の食材ID取得時に予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }
  
  
  
  
  //FoodTableから食材情報を取得
  const FoodTableParam =
  {
    TableName: FoodTable,
    Key: marshall
    ({
      foodId: foodId,
    }),
  };
  
  console.log(FoodTableParam);
  
  const GetFoodDataCommand = new GetItemCommand(FoodTableParam);
  
  try 
  {
    const food = (await client.send(GetFoodDataCommand)).Item;
    
    response.body = JSON.stringify(unmarshall(food));
  } 
  
  catch (e) 
  {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "食材名取得の時に、予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};

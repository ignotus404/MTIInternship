//ユーザー情報取得API用のJSファイルです。
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const UserTable = "team2-user";
// const FoodTable = "team2-food";

// let foodId;

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
    UserTable,
    Item: marshall
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
    
    response.body = JSON.stringify(unmarshall(user));
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
  
//   const GetFoodDataCommand = new GetItemCommand(FoodTableParam);
  
//   const FoodTableParam =
//   {
//     FoodTable,
//     Key: marshall
//     ({
//       foodId,      
//     })
//   };
  
//   try 
//   {
//     const food = (await client.send(GetFoodDataCommand)).Item;
    
//     response.body = JSON.stringify(unmarshall(food));
//   } 
//   catch (e) 
//   {
//     console.error(e);
//     response.statusCode = 500;
//     response.body = JSON.stringify({
//       message: "食材名取得の時に、予期せぬエラーが発生しました。",
//       errorDetail: e.toString(),
//     });
//   }

  return response;
};

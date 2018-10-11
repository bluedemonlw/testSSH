var mongoclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";
var dbName="web1807";
var collection="student";
mongoclient.connect(url,function(err,client){
  if(err){
    console.log(err);
    return;
  }
  var db=client.db(dbName);
  var coll=db.collection(collection);
  /*coll.insertOne({id:106,name:"mike",age:18},function(err,result){
    if(err){
      console.log(err);
      return;
    }
    client.close();
  });*/
  /*coll.deleteOne({id:106},function(err,result){
    if(err){
      console.log(err);
      return;
    }
    client.close();
  });*/
  /*coll.updateOne({id:104},{$set:{name:"david"}},function(err,result){
    if(err){
      console.log(err);
      return;
    }
    client.close();
  });*/
  /*coll.find({}).toArray(function(err,docs){
    if(err){
      console.log(err);
      return;
    }
    console.log(docs);
    client.close();
  });*/
  coll.find({id:101}).toArray(function(err,docs){
    if(err){
      console.log(err);
      return;
    }
    console.log(docs);
    client.close();
  });
});
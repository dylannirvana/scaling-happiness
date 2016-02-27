Meteor.methods({

    // method for generating and encoding AWS policy and signature on the server @AB
    froalaUpload: function() {

      // require crypto module for encoding
      var crypto = Npm.require("crypto");

      // setting expiration date, required by AWS
      var expiration = moment.utc(moment().add(2, 'days')).toISOString();

      // building policy object, according to AWS documentation
      var s3Policy = {
        "expiration": expiration,
        "conditions": [
          ["starts-with", "$key", "data"], 
          {"bucket": "gatekeymusic"}, 
          {"acl": "public-read"}, 
          ["starts-with", "$Content-Type", ''],            
          {"success_action_status": "201"},
          {"x-requested-with": "xhr"}
        ]
      };

      // stringify and encode the policy
      var stringPolicy = JSON.stringify(s3Policy);
      var base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

      // sign the base64 encoded policy
      var signature = crypto.createHmac("sha1", 'qhp96ngD7JYbtdaGG1bCH/N7PRHXDMlrXRwMwz0R')
        .update(new Buffer(base64Policy, "utf-8"))
        .digest("base64");

      // build the results object
      var s3Credentials = {
        s3Policy: base64Policy,
        s3Signature: signature
      };

      // return S3 signature and policy for client or server to use
      return s3Credentials;

    }

});

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { ref } = require('firebase-functions/lib/providers/database');
admin.initializeApp();
var defaultAuth = admin.auth();

exports.sayhello = functions.https.onCall((data, context) => {
    const name = data.name;
    console.log(name);
    return `hello, ${name}`;
})
exports.delateUser = functions.https.onCall((data, context) => {
    const uid = data.uid;
    admin.auth().deleteUser(uid)
        .then(function() {
            return console.log("Successfully deleted user");
        })
        .catch(function(error) {
            return console.log("Error deleting user:", error);
        });

})
exports.createUser = functions.https.onCall((data, context) => {
    var mail = data.email;
    var pass = data.password;
    var id = data.uid;
    admin.auth().createUser({
            uid: id,
            email: mail,
            password: pass
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            return userRecord;
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
})

exports.notificarTodos = functions.https.onRequest((data, context) => {
    var db = admin.database();
    var rf = db.ref('usuarios');
    ref.orderByChlid('uid').then(snapshot => {
        console.log(snapshot);
    })

})
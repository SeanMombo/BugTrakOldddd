const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {

    if (context.auth.token.admin !== true) {
        return {error: 'Only admins can modify user roles'}
    }

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth.serCustomUserClaims(user.uid, {
            admin: true,
        });
    }).then(() => {
        return {
            message: `Success. ${data.email} has been given the roll of Admin`
        }
    }).catch(err => {
        return err;
    });
})
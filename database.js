var database = {

    'cms.users': [

        { username: 'ryan', password: 'password' }

    ],

    'cms.collections': [

        {
            name: 'dogs',
            labels: {
                singular: 'Dog',
                plural: 'Dogs'
            },
            fields: [
                { name: 'name', type: 'string', required: true, unique: true }
            ]
        }

    ],

    'dogs': [

        { name: 'Jangle' },
        { name: 'Rosie' },
        { name: 'Bella' }

    ]

};

var state = {
    user: undefined
};

var logger = {

    error: (msg) => console.error(`Database: ${msg}`)

};

var isSignedIn = () => state.user !== undefined;

var ifSignedInThen = function(onSuccess) {

    return function(){

        var signedIn = isSignedIn();

        if(signedIn) {

            return onSuccess.apply(this, arguments);

        } else {

            logger.error('Please sign in to access this method.');

        }

    };

};

var signIn = function(username, password) {

    var matchingUsers = getCollection('cms.users').filter(
        (user) => user.username === username && user.password === password
    );

    if (matchingUsers.length === 0) {

        logger.error('Could not sign in.');

        return false;

    } else {

        state.user = matchingUsers[0];

        return true;

    }

};

var signOut = function() {

    state.user = undefined;

    return true;

};

var getCollection = function (collectionName) {

    var collection = database[collectionName];

    if(collection === undefined) {

        logger.error(`Could not find collection '${collectionName}'.`);

        return [];

    } else {

        return collection;

    }

};


module.exports = {

    signIn: signIn,
    signOut: signOut,
    isSignedIn: isSignedIn,

    get: ifSignedInThen(getCollection)

}

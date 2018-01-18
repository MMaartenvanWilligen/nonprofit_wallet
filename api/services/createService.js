/**
 * Created by Gebruiker on 18-1-2018.
 */

module.exports = {
    addCharityToWallet: function (options, done) {

        //check if there is a wallet associated with the user. Else create a wallet with the wallet object in options
        Wallet.findOrCreate({user: optionsUserId}, options.WalletObject).exec(function createFindCB(error, createdOrFoundRecords) {
            console.log('What\'s cookin\' ' + createdOrFoundRecords.name + '?');
        });

        //When wallet is created or found populate it with the charity
        Wallet.findOne(walletId).exec(function (err, wallet) {
            if (err) // handle error

            // Queue up a new pet to be added and a record to be created in the join table
                wallet.charities.add(charityId);

            // Save the user, creating the new pet and associations in the join table
            wallet.save(function (err) {
            });
        });


    }
};
 
module.exports = async (message, reaction) => {
    const users = [];
    let lastID = '';

    while (true) { // eslint-disable-line no-constant-condition
        try {
            var fetchedUsers = // eslint-disable-line no-var
                lastID != ''
                    ? await message.reactions.cache.get(reaction).users.fetch({ limit: 100, after: lastID })
                    : (await message.reactions.cache.get(reaction).users.fetch({ limit: 100 }));
        }
        catch {
            return undefined;
        }


        fetchedUsers = fetchedUsers.array();

        if (!fetchedUsers.length) {
            return users;
        }
        else {
            fetchedUsers.forEach((u) => {
                users.push(u);
            });

            lastID = users[users.length - 1].id;
        }
    }
};
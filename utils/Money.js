const client = require("../main");
const { initUser } = require("./databaseRowInit")
const { debug } = require("./Console")

class User {
    constructor(discord_id) {
        this.discord_id = discord_id;
        this.userData = null;
    }

    async fetchUserData() {
        client.database.request('SELECT * FROM users WHERE discord_id = ?', [this.discord_id])
        .then(async (res) => {
            if (res.length === 0) {
                await initUser(this.discord_id);
                this.fetchUserData()
            } else {
                this.userData = res[0];
            }
        })
        .catch(err => {
            debug.error("Error fetching user data");
        })
    }

    async getBalance() {
        if (!this.userData) {
            await this.fetchUserData();
        }
        return this.userData.money;
    }

    async addMoney(amount) {
        if (!this.userData) {
            await this.fetchUserData();
        }
        this.userData.money += amount;
        await client.database.request('UPDATE users SET money = ? WHERE discord_id = ?', [this.userData.money, this.discord_id])
        .catch(err => {
            debug.error("Error adding money");
            this.userData.money -= amount;
        })
        return this.userData.money;
    }

    async removeMoney(amount) {
        if (!this.userData) {
            await this.fetchUserData();
        }
        if (this.userData.money < amount) {
            return -1;
        }
        this.userData.money -= amount;
        await client.database.request('UPDATE users SET money = ? WHERE discord_id = ?', [this.userData.money, this.discord_id])
        .catch(err => {
            debug.error("Error adding money");
            this.userData.money += amount;
        })
        return this.userData.money;
    }

    async send(receiverDiscordId, amount) {
        const receiver = new User(receiverDiscordId);

        let transaction = await this.removeMoney(amount);
        if(transaction != -1) await receiver.addMoney(amount);
    }
}

module.exports = { User };

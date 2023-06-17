require('dotenv').config();
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
	token: process.env.clientToken,
	totalShards: 'auto',
	respawn: true,
});

manager.spawn({
	timeout: 60000,
});

manager.on('shardCreate', async (shard) => {
    console.log("SHARD: Sucess --- Shard " + shard.id + " launched");
});

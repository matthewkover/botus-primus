module.exports = {
    name: "role",
    description: "Role assigner",
    execute(message, args) {
        let watcher = message.content.toLowerCase().substring(6);
            let { cache } = message.guild.roles;
            let role = cache.find(role => role.name.toLowerCase() === watcher)
            if (role) {
                if (message.member.roles.cache.has(role.id)) {
                    message.channel.send("You already have this role!");
                    return;
                }
                if (
                    role.permissions.has("ADMINISTRATOR") || 
                    role.permissions.has("KICK_MEMBERS") || 
                    role.permissions.has("BAN_MEMBERS") ||
                    role.permissions.has("MANAGE_GUILD") ||
                    role.permissions.has("MANAGE_CHANNELS")
                ) {
                    message.channel.send("You cannot add yourself to this role.");
                }
                else {
                    message.member.roles.add(role)
                        .then(member => message.channel.send("You were added to this role!"))
                        .catch(err => console.log(err));
                }
            }
            else {
                message.channel.send("Role not found!");
            }
  },
};
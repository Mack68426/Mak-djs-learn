import {Collection, REST, Routes} from 'discord.js'
import fg from 'fast-glob'
import {useAppStore} from '@/store/app'


const updateSlashCmds = async (commands) =>
{
    const rest = new REST({version:10}).setToken(process.env.TOKEN)

    const result = await rest.put(
        Routes.applicationGuildCommands(
            process.env.APPLICATION_ID,
            '625978186454532126'
        ),
        {
            body: commands
        }
    )

    // console.log(result);
}

export const loadCommands = async () =>
{
    const appStore = useAppStore()
    const commands = []
    const actions = new Collection()
    const files =  await fg('./src/commands/**/script.js')
    
    for(let file of files)
    {
        let cmd = await import(file)
        commands.push(cmd.command)
        actions.set(cmd.command.name, cmd.action)
    }

    await updateSlashCmds(commands)
    appStore.commandsActionMap = actions

    console.log(appStore.commandsActionMap);
}


export const loadEvents = async () => {
    const appStore = useAppStore()
    const client = appStore.client
    const files =  await fg('./src/events/**/script.js')

    for(let eventfile of files)
    {
        const eventFile = await import(eventfile)
        if(eventFile.event.once)
        {
            client.once(
                eventFile.event.name,
                eventFile.action
            );
        }
        else
        {
            client.on(
                eventFile.event.name,
                eventFile.action
            );
        }
    }
} 
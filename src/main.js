import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import {loadCommands, loadEvents} from '@/core/loader'
import {useAppStore} from '@/store/app'

// initialize vue and pinia
vueInit()
// load .env file
dotenv.config()

// load slash commands
loadCommands();


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client;

// load events
loadEvents();


client.login(process.env.TOKEN);
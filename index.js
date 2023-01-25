require("dotenv").config()

const {Client, GatewayIntentBits} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

//Setting Up OpenAi

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration)
const channel = client.channels.cache.get('1067774993812963378');


client.on('messageCreate', async function(message){
    try {

        if(message.author.bot) return;
         
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Hey Give Me a response for this : ${message.content}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
          });

          message.channel.send(`${response.data.choices[0].text}`)

    } catch (error) {
        console.log(error)

    }
})

client.login(process.env.DISCORD_KEY);

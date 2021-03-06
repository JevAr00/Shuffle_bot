const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const { getQueue, deleteQueue } = require('./playerQueue');

const player = createAudioPlayer();

const playerStatus = {
	Idle: AudioPlayerStatus.Idle,
	Playing: AudioPlayerStatus.Playing,
	Paused: AudioPlayerStatus.Paused,
	Buffering: AudioPlayerStatus.Buffering,
	AutoPaused: AudioPlayerStatus.AutoPaused,
};

function getPlayer() {
	return player;
}

function startPlayer(serverQueueKey) {
	const { message, connection, songList } = getQueue(serverQueueKey);
	const song = songList[0];

	if (!song) {
		connection.destroy();
		deleteQueue(serverQueueKey);
		return;
	}

	const resource = createPlayerResource(song);
	player.play(resource);
	connection.subscribe(player);

	player.once(playerStatus.Playing, () => {
		message.channel.send(`${song.title} esta sonando`);
	});

	player.on(playerStatus.Idle, () => {
		songList.shift();
		startPlayer(serverQueueKey);
	});
}

function joinVoice(voiceChannel, messageGuild) {
	return joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: messageGuild.id,
		adapterCreator: messageGuild.voiceAdapterCreator,
	});
}

function closeVoiceConnection(serverQueueKey) {
	const { connection } = getQueue(serverQueueKey);
	connection.destroy();
}

function createPlayerResource(songObject) {
	const stream = ytdl(songObject.url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 });
	return createAudioResource(stream, { inputType: StreamType.Arbitrary, metadata: { title: songObject.title } });
}

async function searchSong(songToSearch) {
	if (ytdl.validateURL(songToSearch[0])) {
		return await searchByUrl(songToSearch);
	}
	else {
		return await searchByName(songToSearch);
	}
}

async function searchByUrl(url) {
	const song = await ytdl.getInfo(url[0]);
	return { title: song.videoDetails.title, url: song.videoDetails.video_url };
}

async function searchByName(query) {
	const songName = query.join(' ');
	const results = await ytSearch(songName);
	const song = (results.videos.length > 1) ? results.videos[0] : null;
	if (song) {
		return { title: song.title, url: song.url };
	}
}

module.exports = {
	playerStatus,
	getPlayer,
	joinVoice,
	searchSong,
	startPlayer,
	closeVoiceConnection,
};
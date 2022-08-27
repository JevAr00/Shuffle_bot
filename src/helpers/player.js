const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	getVoiceConnection,
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

function getPlayerState() {
	return player.state.status;
}

function getPlayerMetadata() {
	return player.state.resource.metadata;
}

function pausePlayer() {
	player.pause();
}

function unpausePlayer() {
	player.unpause();
}

function stopPlayer() {
	player.stop();
}

function startPlayer(serverQueueKey) {
	const queue = getQueue(serverQueueKey);
	const song = queue.songList[0];

	if (!song) {
		closeVoiceConnection(serverQueueKey);
		deleteQueue(serverQueueKey);
		return;
	}

	const resource = createPlayerResource(song);
	player.play(resource);
	queue.connection.subscribe(player);

	queue.message.channel.send(`${song.title} esta sonando`);

	player.on(playerStatus.Idle, () => {
		queue.songList.shift();
		startPlayer(serverQueueKey);
	});
}

function joinVoice(voiceChannel, messageGuild) {
	const voiceConnection = getVoiceConnection(messageGuild.id);

	if (!voiceConnection) {
		return joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: messageGuild.id,
			adapterCreator: messageGuild.voiceAdapterCreator,
		});
	}

	return voiceConnection;
}

function closeVoiceConnection(messageGuildId) {
	const connection = getVoiceConnection(messageGuildId);
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
	getPlayerState,
	joinVoice,
	searchSong,
	startPlayer,
	pausePlayer,
	unpausePlayer,
	stopPlayer,
	closeVoiceConnection,
	getPlayerMetadata,
};
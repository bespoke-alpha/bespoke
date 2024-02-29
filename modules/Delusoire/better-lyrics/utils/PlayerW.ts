import { Subject, animationFrameScheduler, asyncScheduler } from "https://esm.sh/rxjs";
import { S } from "/modules/Delusoirestd/index.js";

import { Events } from "/modules/Delusoirestd/index.js";

import { Song } from "./Song.js";

const PlayerAPI = S.Platform.getPlayerAPI();

export const PlayerW = new (class {
	private Song?: Song;
	isPaused = PlayerAPI._state.isPaused;
	progressPercent = 0;

	songSubject = new Subject<Song | void>();
	isPausedSubject = new Subject<boolean>();
	progressPercentSubject = new Subject<number>();

	getSong = () => this.Song;

	constructor() {
		Events.Player.songchanged.on(state => {
			const { item } = state;

			if (item && item.type === "track") {
				const uri = item.uri;
				const name = item.name;
				const artist = item.metadata.artist_name;
				const album = item.album.name;
				const duration = item.duration.milliseconds;
				const isPaused = state.isPaused;
				const metadata = item.metadata;
				this.Song = new Song({ uri, name, artist, album, duration, isPaused, metadata });
			} else {
				this.Song = undefined;
			}

			this.songSubject.next(this.Song);
		});

		Events.Player.update.on(state => {
			const isPausedNext = state.isPaused ?? true;
			if (this.isPaused) {
				this.startTimestepping();
			}
			this.isPaused = isPausedNext;
			this.isPausedSubject.next(this.isPaused);
		});
	}

	private triggerTimestampSync() {
		let autoSyncs = 0;

		const timeoutFn = () => 1000 * autoSyncs++;

		asyncScheduler.schedule(
			function (self) {
				if (self!.isPaused) return;

				if (!PlayerAPI._events.emitResumeSync()) {
					PlayerAPI._contextPlayer.resume({});
				}

				this.schedule(self, timeoutFn());
			},
			timeoutFn(),
			this,
		);
	}

	private tryUpdateScaledProgress(scaledProgress: number) {
		if (this.progressPercent === scaledProgress) return;
		this.progressPercent = scaledProgress;
		this.progressPercentSubject.next(scaledProgress);
	}

	private startTimestepping() {
		animationFrameScheduler.schedule(
			function (self) {
				if (self!.isPaused) return;
				const item = PlayerAPI.getState().item;
				const dateAtTimestamp = Date.now() - item.timestamp;
				const progress = dateAtTimestamp + item.positionAsOfTimestamp;
				self!.tryUpdateScaledProgress(progress / item.duration);
				this.schedule(self);
			},
			undefined,
			this,
		);

		this.triggerTimestampSync();
	}

	setTimestamp = (percent: number) => {
		PlayerAPI.seekTo(Math.round(percent * this.Song.duration));
		this.tryUpdateScaledProgress(percent);
	};
})();

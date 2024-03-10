export async function readByLine(stream: ReadableStream<Uint8Array>, read: (line: string) => Promise<void>) {
	const reader = stream.getReader();
	const decoder = new TextDecoder();

	let lineBuffer = "";
	while (true) {
		const { done, value } = await reader.read();
		{
			const buffer = decoder.decode(value).replace(/[^ -~\n]+/g, "");

			for (const char of buffer) {
				if (char === "\n") {
					const line = lineBuffer;
					lineBuffer = "";
					await read(line);
					continue;
				}

				lineBuffer += char;
			}
		}
		if (done) break;
	}
}

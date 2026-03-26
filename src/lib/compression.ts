import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import ffmpeg from "fluent-ffmpeg"

const TARGET_SIZE_BYTES = 9 * 1024 * 1024 // 9MB
const AUDIO_BITRATE_KBPS = 128

export async function compressVideo(inputBuffer: Buffer): Promise<Buffer> {
  if (inputBuffer.length <= TARGET_SIZE_BYTES) return inputBuffer

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "uoacs-video-"))
  const inputPath = path.join(tmpDir, "input.mp4")
  const outputPath = path.join(tmpDir, "output.mp4")

  try {
    await fs.writeFile(inputPath, inputBuffer)

    const duration = await getVideoDuration(inputPath)
    const targetBitrateKbps =
      Math.floor((TARGET_SIZE_BYTES * 8) / 1024 / duration) - AUDIO_BITRATE_KBPS

    await twoPassEncode(inputPath, outputPath, targetBitrateKbps, tmpDir)

    return await fs.readFile(outputPath)
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
}

function getVideoDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err)
      const duration = metadata.format.duration
      if (!duration) return reject(new Error("Could not determine video duration"))
      resolve(duration)
    })
  })
}

function twoPassEncode(
  input: string,
  output: string,
  videoBitrateKbps: number,
  passlogDir: string,
): Promise<void> {
  const passlogPrefix = path.join(passlogDir, "ffmpeg2pass")
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        "-c:v libx264",
        `-b:v ${videoBitrateKbps}k`,
        "-pass 1",
        `-passlogfile ${passlogPrefix}`,
        "-an",
        "-f null",
      ])
      .output("/dev/null")
      .on("end", () => {
        ffmpeg(input)
          .outputOptions([
            "-c:v libx264",
            `-b:v ${videoBitrateKbps}k`,
            "-pass 2",
            `-passlogfile ${passlogPrefix}`,
            "-c:a aac",
            `-b:a ${AUDIO_BITRATE_KBPS}k`,
          ])
          .output(output)
          .on("end", () => resolve())
          .on("error", reject)
          .run()
      })
      .on("error", reject)
      .run()
  })
}
